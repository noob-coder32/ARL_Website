# ARL Website Authentication

## Overview

The application uses a React frontend, an Express API, SQL Server, bcrypt password hashing, and JWT-based authentication.

Authentication-related source files:

- `server/src/auth.js` - password hashing, password verification, JWT creation, and authentication middleware
- `server/src/index.js` - login, token verification, protected submissions, and email-reply endpoints
- `server/migrate.js` - database migration runner
- `database/create_staff_users_table.sql` - `StaffUsers` table schema and index
- `client/src/main.jsx` - staff login and authenticated API requests

## Configuration

Create local environment files from the supplied examples. Never commit local `.env` files.

The server reads configuration from environment variables, including:

```text
DB_SERVER
DB_PORT
DB_NAME
DB_USER
DB_PASSWORD
DB_ENCRYPT
DB_TRUST_SERVER_CERTIFICATE
JWT_SECRET
JWT_EXPIRE
SMTP_HOST
SMTP_PORT
SMTP_SECURE
SMTP_USER
SMTP_PASS
SMTP_FROM
```

`JWT_SECRET` must be a strong, randomly generated secret managed outside source control. SMTP settings are optional and are only required when direct email replies are enabled.

The frontend reads its API endpoint from `VITE_API_BASE_URL`. Do not place passwords, JWT secrets, or other private credentials in frontend environment variables because frontend variables are exposed to the browser bundle.

## Database Layer

The `StaffUsers` table stores staff email addresses, bcrypt password hashes, names, roles, departments, active status, and login timestamps. Roles are `admin`, `manager`, and `staff`.

The migration creates the schema and email lookup index. Staff accounts and password hashes must be provisioned separately through a secure operational process; default credentials are intentionally not stored in source control.

Administrators can provision staff accounts from the authenticated staff desk. The create-user request accepts a plaintext password only in the HTTPS request, hashes it immediately with bcrypt on the server, and never stores, logs, or returns the plaintext password. The stored password hash cannot be used to recover the original password.

## Authentication Flow

1. A staff member enters an email address and password in the frontend.
2. The frontend sends the credentials to `POST /api/auth/login` over the configured API endpoint.
3. The API looks up the staff record and compares the supplied password with the stored bcrypt hash.
4. On success, the API returns a signed JWT and public staff profile fields.
5. The frontend stores the session token locally and sends it in the `Authorization: Bearer <token>` header for protected requests.
6. Authentication middleware verifies the JWT and attaches the decoded user context to the request.

The JWT signing secret is never sent to the frontend and is supplied to the server only through `JWT_SECRET`.

## API Behavior

### Login

```text
POST /api/auth/login
Body: { email, password }
Response: { message, token, user: { id, email, fullName, role } }
```

### Token Verification

```text
POST /api/auth/verify
Header: Authorization: Bearer <token>
Response: { valid, user }
```

### Staff User Management

These endpoints require a valid JWT for a user with the `admin` role:

```text
GET /api/auth/users
Response: { users: [{ Id, Email, FullName, Role, Department, IsActive, CreatedAt, LastLoginAt }] }

POST /api/auth/users
Body: { email, fullName, role, department, password }
Response: { message, user: { Id, Email, FullName, Role, Department, IsActive, CreatedAt, LastLoginAt } }

PATCH /api/auth/users/:id/password
Body: { password }
Response: { message }
```

A duplicate email returns `409`. Password resets are administrator-initiated: the administrator provides a new temporary password, and the previous password cannot be recovered.

### Protected Endpoints

These endpoints require a valid JWT:

```text
GET   /api/submissions
PATCH /api/submissions/:id/status
POST  /api/submissions/:id/reply
```

Public form submissions remain available through `POST /api/submissions` and are validated before database insertion.

## Local Testing

Use staff accounts provisioned for the local database through the secure administrator process. Do not add test passwords to source files, documentation, frontend code, or committed environment files.

For API testing, use placeholders rather than real credentials:

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"<staff-email>","password":"<password-from-secure-store>"}'
```

## Security Practices

- Keep `.env` files out of source control.
- Use a strong, unique `JWT_SECRET` per environment.
- Use HTTPS outside local development.
- Provision staff accounts through a controlled process.
- Do not reuse passwords between staff accounts or environments.
- Consider rate limiting and audit logging for production deployments.
- Do not expose database or SMTP credentials to the frontend.
