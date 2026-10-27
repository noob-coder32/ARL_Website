# ARL Website MVP

Local full-stack MVP for a company website using React, Node.js, Express, and SQL Server.

## Project Structure

- `client/` - React frontend powered by Vite
- `server/` - Express API connected to SQL Server
- `database/` - SQL Server setup scripts

## Setup

1. Create the submissions table:

   Run `database/create_submissions_table.sql` against the `tododb` database.

2. Install dependencies:

   ```bash
   cd server
   npm install
   cd ../client
   npm install
   ```

3. Start the backend:

   ```bash
   cd server
   npm run dev
   ```

4. Start the frontend:

   ```bash
   cd client
   npm run dev
   ```

For local development, the frontend defaults to the local Express server at `http://localhost:5000`; `client/.env.example` shows the optional override.

## Single App Service Deployment

The GitHub Actions workflow builds the React client and packages its output with the Express server for the existing Azure App Service. Express serves the frontend at `/` and keeps the API under `/api/...`; with no production API base override, frontend requests use the same-origin `/api/...` paths. No separate frontend hosting service is required.

The server starts with `npm start` from `server/`. The deployment workflow uses Node.js 22 and includes the generated client files under `server/client-dist/`. Keep database, JWT, and SMTP configuration in Azure App Service environment settings; never place those values in Vite variables.

Git learning test - Version 2
