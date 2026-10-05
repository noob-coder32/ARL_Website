import dotenv from 'dotenv';
import dns from 'dns';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPostgresPath = path.resolve(__dirname, '../.env.postgres');
if (fs.existsSync(envPostgresPath)) {
  dotenv.config({ path: envPostgresPath });
}
dotenv.config();

// Render environments may resolve SMTP hosts to IPv6 without having IPv6 routing.
// Prefer IPv4 for all outbound DNS lookups, including the SMTP connection.
dns.setDefaultResultOrder('ipv4first');

import cors from 'cors';
import express from 'express';
import nodemailer from 'nodemailer';
import { getPool } from './db.js';
import { validateSubmission } from './validation.js';
import { authMiddleware, generateToken, hashPassword, requireRole, verifyPassword } from './auth.js';

const app = express();  
const port = Number(process.env.PORT || 5000);

const normalizeOrigin = (url) => (url ? url.trim().replace(/\/+$/, '') : '');

// Load allowed origins strictly from environment variables (supports comma-separated list)
const allowedOrigins = new Set(
  [
    process.env.CLIENT_ORIGIN,
    process.env.FRONTEND_URL,
    process.env.ALLOWED_ORIGINS,
  ]
    .filter(Boolean)
    .flatMap((val) => val.split(',').map(normalizeOrigin))
    .filter(Boolean)
);

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (e.g. mobile apps, curl, server-to-server)
    if (!origin) return callback(null, true);

    const normalized = normalizeOrigin(origin);
    if (allowedOrigins.has(normalized)) {
      return callback(null, true);
    }
    return callback(new Error(`Origin ${origin} is not allowed by CORS`));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());

app.get('/api/health', async (_req, res) => {
  try {
    const pool = await getPool();
    await pool.query('SELECT 1');
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
    const result = await pool.query(`
      SELECT "Id", "Email", "PasswordHash", "FullName", "Role", "IsActive"
      FROM "StaffUsers"
      WHERE LOWER("Email") = $1;
    `, [email]);

    const user = result.rows[0];
    if (!user || !user.IsActive || !(await verifyPassword(password, user.PasswordHash))) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    await pool.query(
      'UPDATE "StaffUsers" SET "LastLoginAt" = CURRENT_TIMESTAMP WHERE "Id" = $1',
      [user.Id]
    );

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

const validStaffRoles = ['admin', 'manager', 'staff'];

app.get('/api/auth/users', authMiddleware, requireRole('admin'), async (_req, res) => {
  try {
    const pool = await getPool();
    const result = await pool.query(`
      SELECT "Id", "Email", "FullName", "Role", "Department", "IsActive", "CreatedAt", "LastLoginAt"
      FROM "StaffUsers"
      ORDER BY "FullName", "Email";
    `);

    return res.json({ users: result.rows });
  } catch (error) {
    console.error('Staff user list error:', error);
    return res.status(500).json({ message: 'Could not retrieve staff users.' });
  }
});

app.post('/api/auth/users', authMiddleware, requireRole('admin'), async (req, res) => {
  const email = typeof req.body?.email === 'string' ? req.body.email.trim().toLowerCase() : '';
  const fullName = typeof req.body?.fullName === 'string' ? req.body.fullName.trim() : '';
  const department = typeof req.body?.department === 'string' ? req.body.department.trim() : '';
  const role = typeof req.body?.role === 'string' ? req.body.role.trim().toLowerCase() : 'staff';
  const password = typeof req.body?.password === 'string' ? req.body.password : '';

  if (!email || !fullName || !password) {
    return res.status(400).json({ message: 'Email, full name, and password are required.' });
  }

  if (!validStaffRoles.includes(role)) {
    return res.status(400).json({ message: 'Role must be admin, manager, or staff.' });
  }

  try {
    const passwordHash = await hashPassword(password);
    const pool = await getPool();
    const result = await pool.query(`
      INSERT INTO "StaffUsers" ("Email", "PasswordHash", "FullName", "Role", "Department")
      VALUES ($1, $2, $3, $4, $5)
      RETURNING "Id", "Email", "FullName", "Role", "Department", "IsActive", "CreatedAt", "LastLoginAt";
    `, [email, passwordHash, fullName, role, department || null]);

    return res.status(201).json({
      message: 'Staff user created successfully.',
      user: result.rows[0]
    });
  } catch (error) {
    // PostgreSQL unique constraint violation error code is 23505
    if (error.code === '23505') {
      return res.status(409).json({ message: 'A staff user with that email already exists.' });
    }

    console.error('Staff user creation error:', error);
    return res.status(500).json({ message: 'Could not create staff user.' });
  }
});

app.patch('/api/auth/users/:id/password', authMiddleware, requireRole('admin'), async (req, res) => {
  const userId = Number.parseInt(req.params.id, 10);
  const password = typeof req.body?.password === 'string' ? req.body.password : '';

  if (!Number.isInteger(userId) || userId < 1) {
    return res.status(400).json({ message: 'A valid staff user ID is required.' });
  }

  try {
    const passwordHash = await hashPassword(password);
    const pool = await getPool();
    const result = await pool.query(`
      UPDATE "StaffUsers"
      SET "PasswordHash" = $1
      WHERE "Id" = $2;
    `, [passwordHash, userId]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Staff user not found.' });
    }

    return res.json({ message: 'Staff user password reset successfully.' });
  } catch (error) {
    console.error('Staff password reset error:', error);
    return res.status(500).json({ message: 'Could not reset staff user password.' });
  }
});

app.post('/api/submissions', async (req, res) => {
  const { isValid, errors, submission } = validateSubmission(req.body);

  if (!isValid) {
    return res.status(400).json({ message: 'Please correct the form errors.', errors });
  }

  try {
    const pool = await getPool();
    const result = await pool.query(`
      INSERT INTO "ClientSubmissions"
        ("Name", "Email", "Phone", "SubmissionType", "Subject", "Message")
      VALUES
        ($1, $2, $3, $4, $5, $6)
      RETURNING "Id", "Status", "CreatedAt";
    `, [
      submission.name,
      submission.email,
      submission.phone || null,
      submission.submissionType,
      submission.subject,
      submission.message
    ]);

    res.status(201).json({
      message: 'Submission received successfully.',
      submission: result.rows[0]
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
    const result = await pool.query(`
      SELECT
        "Id",
        "Name",
        "Email",
        "Phone",
        "SubmissionType",
        "Subject",
        "Message",
        "Status",
        to_char("CreatedAt", 'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"') AS "CreatedAt"
      FROM "ClientSubmissions"
      ORDER BY "CreatedAt" DESC
      LIMIT 100;
    `);

    res.json({ submissions: result.rows });
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
    const result = await pool.query(`
      UPDATE "ClientSubmissions"
      SET "Status" = $1
      WHERE "Id" = $2;
    `, [status, Number(id)]);

    if (result.rowCount === 0) {
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

    if (!targetEmail) {
      const subResult = await pool.query(`
        SELECT "Email", "Subject" FROM "ClientSubmissions" WHERE "Id" = $1
      `, [Number(id)]);

      if (subResult.rows.length === 0) {
        return res.status(404).json({ message: 'Submission not found.' });
      }
      targetEmail = subResult.rows[0].Email;
      targetSubject = subResult.rows[0].Subject;
    }

    let emailSent = false;
    let emailError = null;

    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      try {
        const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
        const smtpPort = Number(process.env.SMTP_PORT || 587);
        const isSecure = process.env.SMTP_SECURE === 'true' || smtpPort === 465;

        // Render and some cloud hosts do not have IPv6 routing configured.
        // Explicitly pre-resolve to an IPv4 address to avoid Nodemailer choosing an unreachable IPv6 address.
        let resolvedHost = smtpHost;
        try {
          const lookupResult = await dns.promises.lookup(smtpHost, { family: 4 });
          if (lookupResult && lookupResult.address) {
            resolvedHost = lookupResult.address;
          }
        } catch (dnsErr) {
          console.warn(`Could not force IPv4 lookup for ${smtpHost}, falling back to original host:`, dnsErr.message);
        }

        const transporter = nodemailer.createTransport({
          host: resolvedHost,
          port: smtpPort,
          secure: isSecure,
          connectionTimeout: 10000,
          greetingTimeout: 10000,
          tls: {
            servername: smtpHost, // Preserve SNI for SSL/TLS verification when host is an IP
          },
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        });

        await transporter.sendMail({
          from: process.env.SMTP_FROM || `"Assam Roofing Limited" <${process.env.SMTP_USER}>`,
          to: targetEmail,
          subject: `Re: ${targetSubject || 'Inquiry Response - Assam Roofing Limited'}`,
          text: `${replyText}\n\nWarm regards,\n${staffName || 'Customer Support Team'}\nAssam Roofing Limited\nBonda Narangi, Guwahati, Assam 781026\nWebsite: assamroofing.com`,
          html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #1e293b; max-width: 600px;">
              <h3 style="color: #0d7054; border-bottom: 2px solid #0d7054; padding-bottom: 8px;">Assam Roofing Limited</h3>
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
      await pool.query(`
        UPDATE "ClientSubmissions"
        SET "Status" = 'Replied', "ReplyText" = $1, "RepliedAt" = CURRENT_TIMESTAMP
        WHERE "Id" = $2;
      `, [replyText, Number(id)]);
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
