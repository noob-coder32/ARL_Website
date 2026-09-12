-- Create StaffUsers table for authentication
-- This table stores authorized staff members who can access the admin submissions dashboard

IF OBJECT_ID('dbo.StaffUsers', 'U') IS NULL
BEGIN
    CREATE TABLE dbo.StaffUsers (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        Email NVARCHAR(180) NOT NULL UNIQUE,
        PasswordHash NVARCHAR(MAX) NOT NULL,
        FullName NVARCHAR(120) NOT NULL,
        Role NVARCHAR(30) NOT NULL CONSTRAINT DF_StaffUsers_Role DEFAULT ('staff'),
        Department NVARCHAR(100) NULL,
        IsActive BIT NOT NULL CONSTRAINT DF_StaffUsers_IsActive DEFAULT (1),
        CreatedAt DATETIME2 NOT NULL CONSTRAINT DF_StaffUsers_CreatedAt DEFAULT (SYSDATETIME()),
        LastLoginAt DATETIME2 NULL,
        CONSTRAINT CK_StaffUsers_Role CHECK (
            Role IN ('admin', 'manager', 'staff')
        )
    );
END;

-- Staff accounts and password hashes are intentionally provisioned separately
-- through a secure operational process and are not stored in source control.

-- Create an index for faster email lookups during login
IF NOT EXISTS (SELECT 1 FROM sys.indexes WHERE name = 'IX_StaffUsers_Email' AND object_id = OBJECT_ID('dbo.StaffUsers'))
BEGIN
    CREATE NONCLUSTERED INDEX IX_StaffUsers_Email ON dbo.StaffUsers(Email);
END;
