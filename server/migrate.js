/**
 * Database Migration Runner
 * Executes SQL scripts to set up StaffUsers table
 * Run with: node migrate.js
 */

import 'dotenv/config';
import sql from 'mssql';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Database configuration from .env
const dbConfig = {
  server: process.env.DB_SERVER,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  options: {
    encrypt: process.env.DB_ENCRYPT === 'true',
    trustServerCertificate: process.env.DB_TRUST_SERVER_CERTIFICATE === 'true',
  }
};

async function runMigration() {
  let pool;
  try {
    console.log('🔄 Connecting to database...');
    pool = await sql.connect(dbConfig);
    console.log('✅ Connected to database');

    // Read SQL migration file
    const sqlPath = path.join(__dirname, '../database/create_staff_users_table.sql');
    const sqlScript = fs.readFileSync(sqlPath, 'utf8');

    console.log('🔄 Running database migration...');
    // Execute the SQL script
    await pool.request().batch(sqlScript);
    console.log('✅ Database migration completed successfully!');

    // Verify tables were created
    const verification = await pool.request().query(`
      SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES 
      WHERE TABLE_SCHEMA = 'dbo' AND TABLE_NAME IN ('StaffUsers', 'ClientSubmissions')
    `);
    
    console.log('✅ Verified tables:');
    verification.recordset.forEach(row => {
      console.log(`   - dbo.${row.TABLE_NAME}`);
    });

    console.log('\n✅ Migration completed successfully!');
    console.log('Staff accounts must be provisioned separately using the secure operations process.');
    
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    process.exit(1);
  } finally {
    if (pool) {
      await pool.close();
      console.log('\n🔌 Database connection closed');
    }
  }
}

// Run migration
runMigration();
