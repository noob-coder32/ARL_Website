/**
 * Admin User Seed Script
 * Creates or updates an initial administrator account for the ARL staff dashboard.
 * 
 * Usage:
 *   node seed-admin.js [email] [password] [fullName]
 * Example:
 *   node seed-admin.js admin@assamroofing.com SecurePass123! "ARL Admin"
 */

import 'dotenv/config';
import { getPool } from './src/db.js';
import { hashPassword } from './src/auth.js';

async function seedAdmin() {
  const email = (process.argv[2] || 'admin@assamroofing.com').trim().toLowerCase();
  const rawPassword = process.argv[3] || 'Admin@12345';
  const fullName = process.argv[4] || 'ARL Administrator';

  let pool;
  try {
    console.log('🔄 Connecting to PostgreSQL database...');
    pool = await getPool();

    console.log(`🔑 Generating password hash for: ${email}`);
    const passwordHash = await hashPassword(rawPassword);

    // Upsert admin user
    const result = await pool.query(`
      INSERT INTO "StaffUsers" ("Email", "PasswordHash", "FullName", "Role", "Department", "IsActive")
      VALUES ($1, $2, $3, 'admin', 'Management', TRUE)
      ON CONFLICT ("Email") 
      DO UPDATE SET 
        "PasswordHash" = EXCLUDED."PasswordHash",
        "FullName" = EXCLUDED."FullName",
        "Role" = 'admin',
        "IsActive" = TRUE
      RETURNING "Id", "Email", "FullName", "Role";
    `, [email, passwordHash, fullName]);

    const admin = result.rows[0];
    console.log('\n🎉 Admin account ready:');
    console.log(`   - ID: ${admin.Id}`);
    console.log(`   - Email: ${admin.Email}`);
    console.log(`   - Full Name: ${admin.FullName}`);
    console.log(`   - Role: ${admin.Role}`);
    console.log(`   - Temporary Password: ${rawPassword}`);
    console.log('\n⚠️ Please remember to change this password in the dashboard after logging in.\n');

  } catch (error) {
    console.error('❌ Failed to seed admin user:', error.message);
    process.exit(1);
  } finally {
    if (pool) {
      await pool.end();
      console.log('🔌 Database connection closed');
    }
  }
}

seedAdmin();
