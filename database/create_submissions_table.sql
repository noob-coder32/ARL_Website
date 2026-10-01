-- Create ClientSubmissions table in PostgreSQL
-- This table stores contact form submissions from clients

CREATE TABLE IF NOT EXISTS "ClientSubmissions" (
    "Id" SERIAL PRIMARY KEY,
    "Name" VARCHAR(120) NOT NULL,
    "Email" VARCHAR(180) NOT NULL,
    "Phone" VARCHAR(40) NULL,
    "SubmissionType" VARCHAR(20) NOT NULL,
    "Subject" VARCHAR(180) NOT NULL,
    "Message" TEXT NOT NULL,
    "Status" VARCHAR(30) NOT NULL DEFAULT 'New',
    "CreatedAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ReplyText" TEXT NULL,
    "RepliedAt" TIMESTAMPTZ NULL,
    CONSTRAINT "CK_ClientSubmissions_SubmissionType" CHECK (
        "SubmissionType" IN ('enquiry', 'request', 'complaint', 'feedback')
    )
);

-- Indexes for dashboard sorting and filtering
CREATE INDEX IF NOT EXISTS "IX_ClientSubmissions_CreatedAt" ON "ClientSubmissions"("CreatedAt" DESC);
CREATE INDEX IF NOT EXISTS "IX_ClientSubmissions_Status" ON "ClientSubmissions"("Status");
