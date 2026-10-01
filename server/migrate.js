/**
 * PostgreSQL Database Migration Runner
 * Executes SQL scripts to set up StaffUsers and ClientSubmissions tables
 * Run with: npm run migrate
 */

import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { getPool } from './src/db.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function runMigration() {
  let pool;
  try {
    console.log('🔄 Connecting to PostgreSQL database...');
    pool = await getPool();
    console.log('✅ Connected to database');

    const migrationFiles = [
      'create_staff_users_table.sql',
      'create_submissions_table.sql'
    ];

    for (const file of migrationFiles) {
      const sqlPath = path.join(__dirname, '../database', file);
      if (fs.existsSync(sqlPath)) {
        console.log(`🔄 Running migration: ${file}...`);
        const sqlScript = fs.readFileSync(sqlPath, 'utf8');
        await pool.query(sqlScript);
        console.log(`✅ Applied ${file}`);
      } else {
        console.warn(`⚠️ Migration file not found: ${sqlPath}`);
      }
    }

    // Verify tables were created
    const verification = await pool.query(`
      SELECT table_name
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
        AND table_name IN ('StaffUsers', 'ClientSubmissions')
      ORDER BY table_name;
    `);

    console.log('\n✅ Verified tables in database:');
    if (verification.rows.length === 0) {
      console.log('   (No matching tables found - check schema permissions)');
    } else {
      verification.rows.forEach((row) => {
        console.log(`   - public.${row.table_name}`);
      });
    }

    console.log('\n✅ PostgreSQL migration completed successfully!');
    console.log('Staff accounts must be provisioned separately using the secure operations process.');

  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    process.exit(1);
  } finally {
    if (pool) {
      await pool.end();
      console.log('\n🔌 Database connection closed');
    }
  }
}

// Run migration
runMigration();
