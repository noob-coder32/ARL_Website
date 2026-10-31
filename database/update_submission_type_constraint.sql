-- Allow 'dealership' as a ClientSubmissions.SubmissionType
-- Safe to run more than once.

IF EXISTS (
    SELECT 1
    FROM sys.check_constraints
    WHERE name = 'CK_ClientSubmissions_SubmissionType'
      AND parent_object_id = OBJECT_ID('dbo.ClientSubmissions')
)
BEGIN
    ALTER TABLE dbo.ClientSubmissions
        DROP CONSTRAINT CK_ClientSubmissions_SubmissionType;
END;

ALTER TABLE dbo.ClientSubmissions
    ADD CONSTRAINT CK_ClientSubmissions_SubmissionType CHECK (
        SubmissionType IN ('enquiry', 'request', 'complaint', 'feedback', 'dealership')
    );