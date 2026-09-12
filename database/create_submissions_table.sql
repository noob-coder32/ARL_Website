IF OBJECT_ID('dbo.ClientSubmissions', 'U') IS NULL
BEGIN
    CREATE TABLE dbo.ClientSubmissions (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        Name NVARCHAR(120) NOT NULL,
        Email NVARCHAR(180) NOT NULL,
        Phone NVARCHAR(40) NULL,
        SubmissionType NVARCHAR(20) NOT NULL,
        Subject NVARCHAR(180) NOT NULL,
        Message NVARCHAR(MAX) NOT NULL,
        Status NVARCHAR(30) NOT NULL CONSTRAINT DF_ClientSubmissions_Status DEFAULT ('new'),
        CreatedAt DATETIME2 NOT NULL CONSTRAINT DF_ClientSubmissions_CreatedAt DEFAULT (SYSDATETIME()),
        CONSTRAINT CK_ClientSubmissions_SubmissionType CHECK (
            SubmissionType IN ('enquiry', 'request', 'complaint', 'feedback')
        )
    );
END;

IF OBJECT_ID('dbo.ClientSubmissions', 'U') IS NOT NULL
BEGIN
    IF COL_LENGTH('dbo.ClientSubmissions', 'ReplyText') IS NULL
        ALTER TABLE dbo.ClientSubmissions ADD ReplyText NVARCHAR(MAX) NULL;

    IF COL_LENGTH('dbo.ClientSubmissions', 'RepliedAt') IS NULL
        ALTER TABLE dbo.ClientSubmissions ADD RepliedAt DATETIME2 NULL;
END;

