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

The React app expects the API at `http://localhost:5000` by default.

