import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import nodemailer from 'nodemailer';
import { getPool, sql } from './db.js';
import { validateSubmission } from './validation.js';
import { authMiddleware, generateToken, verifyPassword } from './auth.js';

const app = express();
const port = Number(process.env.PORT || 5000);

const allowedOrigins = [
  process.env.CLIENT_ORIGIN,
  process.env.FRONTEND_URL,
  'http://192.168.1.29:5177',
  // 'http://localhost:5173',
  // 'http://127.0.0.1:5173',
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Origin is not allowed by CORS'));
  },
  credentials: true,
}));
app.use(express.json());

app.get('/api/health', async (_req, res) => {
  try {
    await getPool();
    res.json({
      status: 'ok',
      database: 'connected',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(503).json({
      status: 'error',
      database: 'unavailable',
      message: error.message
    });
  }
});

app.post('/api/auth/login', async (req, res) => {
  const email = typeof req.body?.email === 'string' ? req.body.email.trim().toLowerCase() : '';
  const password = typeof req.body?.password === 'string' ? req.body.password : '';

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  try {
    const pool = await getPool();
    const result = await pool.request()
      .input('Email', sql.NVarChar(180), email)
      .query(`
        SELECT Id, Email, PasswordHash, FullName, Role, IsActive
        FROM dbo.StaffUsers
        WHERE LOWER(Email) = @Email;
      `);

    const user = result.recordset[0];
    if (!user || !user.IsActive || !(await verifyPassword(password, user.PasswordHash))) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    await pool.request()
      .input('Id', sql.Int, user.Id)
      .query('UPDATE dbo.StaffUsers SET LastLoginAt = SYSDATETIME() WHERE Id = @Id');

    const publicUser = {
      id: user.Id,
      email: user.Email,
      fullName: user.FullName,
      role: user.Role,    
    };

    return res.json({
      message: 'Login successful.',
      token: generateToken(publicUser),
      user: publicUser,
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Could not process login.' });
  }
});

app.post('/api/auth/verify', authMiddleware, (req, res) => {
  res.json({ valid: true, user: req.user });
});

app.post('/api/submissions', async (req, res) => {
  const { isValid, errors, submission } = validateSubmission(req.body);

  if (!isValid) {
    return res.status(400).json({ message: 'Please correct the form errors.', errors });
  }

  try {
    const pool = await getPool();
    const result = await pool.request()
      .input('Name', sql.NVarChar(120), submission.name)
      .input('Email', sql.NVarChar(180), submission.email)
      .input('Phone', sql.NVarChar(40), submission.phone || null)
      .input('SubmissionType', sql.NVarChar(20), submission.submissionType)
      .input('Subject', sql.NVarChar(180), submission.subject)
      .input('Message', sql.NVarChar(sql.MAX), submission.message)
      .query(`
        INSERT INTO dbo.ClientSubmissions
          (Name, Email, Phone, SubmissionType, Subject, Message)
        OUTPUT INSERTED.Id, INSERTED.Status, INSERTED.CreatedAt
        VALUES
          (@Name, @Email, @Phone, @SubmissionType, @Subject, @Message);
      `);

    res.status(201).json({
      message: 'Submission received successfully.',
      submission: result.recordset[0]
    });
  } catch (error) {
    res.status(500).json({
      message: 'Could not save the submission.',
      error: error.message
    });
  }
});

app.get('/api/submissions', authMiddleware, async (_req, res) => {
  try {
    const pool = await getPool();
    const result = await pool.request().query(`
      SELECT TOP (100)
        Id,
        Name,
        Email,
        Phone,
        SubmissionType,
        Subject,
        Message,
        Status,
        CONVERT(VARCHAR(27), CreatedAt, 126) AS CreatedAt
      FROM dbo.ClientSubmissions
      ORDER BY CreatedAt DESC;
    `);

    res.json({ submissions: result.recordset });
  } catch (error) {
    res.status(500).json({
      message: 'Could not load submissions.',
      error: error.message
    });
  }
});

app.patch('/api/submissions/:id/status', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const validStatuses = ['New', 'Replied', 'Closed', 'In Progress'];

  if (!status || !validStatuses.includes(status)) {
    return res.status(400).json({
      message: `Invalid status. Must be one of: ${validStatuses.join(', ')}`
    });
  }

  try {
    const pool = await getPool();
    const result = await pool.request()
      .input('Id', sql.Int, Number(id))
      .input('Status', sql.NVarChar(30), status)
      .query(`
        UPDATE dbo.ClientSubmissions
        SET Status = @Status
        WHERE Id = @Id;

        SELECT @@ROWCOUNT AS RowsAffected;
      `);

    if (result.recordset[0].RowsAffected === 0) {
      return res.status(404).json({ message: 'Submission not found.' });
    }

    res.json({ message: 'Status updated successfully.', id: Number(id), status });
  } catch (error) {
    res.status(500).json({
      message: 'Could not update status.',
      error: error.message
    });
  }
});

app.post('/api/submissions/:id/reply', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { replyText, staffName, recipientEmail, subject } = req.body;

  if (!replyText || !replyText.trim()) {
    return res.status(400).json({ message: 'Reply message cannot be empty.' });
  }

  try {
    const pool = await getPool();

    let targetEmail = recipientEmail;
    let targetSubject = subject;
    let customerName = 'Valued Customer';

    if (!targetEmail) {
      const subResult = await pool.request()
        .input('Id', sql.Int, Number(id))
        .query(`SELECT Name, Email, Subject FROM dbo.ClientSubmissions WHERE Id = @Id`);

      if (subResult.recordset.length === 0) {
        return res.status(404).json({ message: 'Submission not found.' });
      }
      targetEmail = subResult.recordset[0].Email;
      targetSubject = subResult.recordset[0].Subject;
      customerName = subResult.recordset[0].Name;
    }

    let emailSent = false;
    let emailError = null;

    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST || 'smtp.gmail.com',
          port: Number(process.env.SMTP_PORT || 587),
          secure: process.env.SMTP_SECURE === 'true',
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        });

        await transporter.sendMail({
          from: process.env.SMTP_FROM || `"Assam Roofing Limited" <${process.env.SMTP_USER}>`,
          to: targetEmail,
          subject: `Re: ${targetSubject || 'Inquiry Response - Assam Roofing Limited'}`,
          text: `Dear ${customerName},\n\n${replyText}\n\nWarm regards,\n${staffName || 'Customer Support Team'}\nAssam Roofing Limited\nBonda Narangi, Guwahati, Assam 781026\nWebsite: assamroofing.com`,
          html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #1e293b; max-width: 600px;">
              <h3 style="color: #0d7054; border-bottom: 2px solid #0d7054; padding-bottom: 8px;">Assam Roofing Limited</h3>
              <p>Dear <strong>${customerName}</strong>,</p>
              <div style="background: #f8fafc; border-left: 4px solid #0d7054; padding: 14px 18px; margin: 16px 0; border-radius: 4px;">
                ${replyText.replace(/\n/g, '<br/>')}
              </div>
              <p style="margin-top: 24px; font-size: 0.9rem; color: #64748b;">
                Warm regards,<br/>
                <strong>${staffName || 'Customer Support Team'}</strong><br/>
                Assam Roofing Limited<br/>
                Bonda Narangi, Guwahati, Assam 781026
              </p>
            </div>
          `,
        });
        emailSent = true;
      } catch (err) {
        console.error('SMTP send error:', err);
        emailError = err.message;
      }
    }

    try {
      await pool.request()
        .input('Id', sql.Int, Number(id))
        .input('ReplyText', sql.NVarChar(sql.MAX), replyText)
        .query(`
          IF COL_LENGTH('dbo.ClientSubmissions', 'ReplyText') IS NOT NULL
            AND COL_LENGTH('dbo.ClientSubmissions', 'RepliedAt') IS NOT NULL
          BEGIN
            EXEC sys.sp_executesql
              N'UPDATE dbo.ClientSubmissions
                SET Status = ''Replied'', ReplyText = @ReplyText, RepliedAt = SYSDATETIME()
                WHERE Id = @Id',
              N'@Id INT, @ReplyText NVARCHAR(MAX)',
              @Id = @Id,
              @ReplyText = @ReplyText;
          END
          ELSE
            UPDATE dbo.ClientSubmissions
            SET Status = 'Replied'
            WHERE Id = @Id;
        `);
    } catch (dbErr) {
      console.warn('Could not update ReplyText in DB:', dbErr.message);
    }

    res.json({
      message: emailSent
        ? 'Reply sent successfully via email.'
        : (emailError ? `Reply recorded, but email sending failed: ${emailError}` : 'Reply recorded in database. (Configure SMTP in .env to send direct emails)'),
      emailSent,
      emailError,
      status: 'Replied',
    });
  } catch (error) {
    res.status(500).json({
      message: 'Could not process reply.',
      error: error.message
    });
  }
});

app.use((_req, res) => {
  res.status(404).json({ message: 'Route not found.' });
});

app.listen(port, () => {
  console.log(`ARL API running on http://localhost:${port}`);
});
