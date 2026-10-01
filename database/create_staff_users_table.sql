-- Create StaffUsers table for authentication in PostgreSQL
-- This table stores authorized staff members who can access the admin submissions dashboard

CREATE TABLE IF NOT EXISTS "StaffUsers" (
    "Id" SERIAL PRIMARY KEY,
    "Email" VARCHAR(180) NOT NULL UNIQUE,
    "PasswordHash" TEXT NOT NULL,
    "FullName" VARCHAR(120) NOT NULL,
    "Role" VARCHAR(30) NOT NULL DEFAULT 'staff',
    "Department" VARCHAR(100) NULL,
    "IsActive" BOOLEAN NOT NULL DEFAULT TRUE,
    "CreatedAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "LastLoginAt" TIMESTAMPTZ NULL,
    CONSTRAINT "CK_StaffUsers_Role" CHECK (
        "Role" IN ('admin', 'manager', 'staff')
    )
);

-- Staff accounts and password hashes are intentionally provisioned separately
-- through a secure operational process and are not stored in source control.

-- Create index for faster email lookups during login
CREATE INDEX IF NOT EXISTS "IX_StaffUsers_Email" ON "StaffUsers"("Email");
