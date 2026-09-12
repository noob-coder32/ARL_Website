# ARL Website Development Setup

## Overview

The project contains two applications:

- `client/` - React frontend powered by Vite
- `server/` - Express API connected to SQL Server

The frontend communicates with the backend through the API URL configured by `VITE_API_BASE_URL`. The backend uses environment variables for database, authentication, email, and listener configuration.

This document describes a generic development setup. Hostnames, IP addresses, credentials, and deployment-specific network details are intentionally omitted.

## Environment Configuration

Create local environment files from the provided examples and supply values through a secure local or deployment configuration system.

Server configuration includes:

```text
PORT
CLIENT_ORIGIN
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

Frontend configuration includes:

```text
VITE_API_BASE_URL
```

Never commit `.env` files. Do not put passwords, JWT secrets, SMTP credentials, database credentials, or other private values in frontend variables because Vite embeds frontend variables into browser-delivered assets.

## Start the Backend

From the `server` directory:

```bash
npm install
npm run dev
```

The backend listens on the configured `PORT` value. Use the local environment file or deployment configuration to choose the listener port.

## Start the Frontend

From the `client` directory:

```bash
npm install
npm run dev
```

The frontend uses `VITE_API_BASE_URL` for API requests. For local development, this is normally a localhost API URL. For shared development, configure the URL through the local environment of the development host rather than documenting an internal address here.

## Available Frontend Scripts

The available scripts are defined in `client/package.json`, including:

- `npm run dev` - start the normal Vite development server
- `npm run build` - create a production frontend build
- any host-specific development script - use only when required by the local deployment setup

Host binding and port choices should be supplied through the development environment and should not be treated as production security controls.

## Database Setup

Run the SQL scripts in `database/` against the database configured by `DB_SERVER`, `DB_PORT`, and `DB_NAME`.

- `create_submissions_table.sql` creates the client submissions table and related fields.
- `create_staff_users_table.sql` creates the staff authentication table and email index.

Staff users and password hashes are not seeded by the source-controlled migration. Provision them separately using a secure administrative process.

The migration runner reads its database connection settings from the server environment and can be run from the `server` directory with the project migration command or documented Node.js entry point.

## Request and Authentication Flow

1. The browser loads the frontend from the configured development or deployment host.
2. The frontend sends API requests to `VITE_API_BASE_URL`.
3. Public submissions are validated by the backend and stored in SQL Server.
4. Staff login uses `POST /api/auth/login`.
5. Protected administrative requests include a JWT in the `Authorization` header.
6. The backend verifies the token using `JWT_SECRET` and permits authenticated operations.

The server controls CORS through its configured client origin. CORS configuration should be limited to the intended frontend origins in each environment.

## Operational Guidance

- Keep database, JWT, and SMTP values in a secrets manager or protected environment configuration.
- Use different credentials and JWT secrets for development, staging, and production.
- Do not publish internal hostnames, IP addresses, ports, network diagrams, or access instructions.
- Do not use a Vite frontend variable for a secret.
- Do not include staff passwords or demo credentials in documentation.
- Use HTTPS and appropriate reverse-proxy controls for deployments accessible beyond local development.
