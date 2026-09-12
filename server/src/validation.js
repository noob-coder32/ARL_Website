const allowedTypes = new Set(['enquiry', 'request', 'complaint', 'feedback']);
const phonePattern = /^[0-9+\-\s()]{7,20}$/;

const normalizeText = (value) => String(value ?? '').trim();

export const validateSubmission = (body) => {
  const submission = {
    name: normalizeText(body.name),
    email: normalizeText(body.email).toLowerCase(),
    phone: normalizeText(body.phone),
    submissionType: normalizeText(body.submissionType).toLowerCase(),
    subject: normalizeText(body.subject),
    message: normalizeText(body.message)
  };

  const errors = [];

  if (!submission.name) errors.push('Name is required.');
  if (!submission.email) errors.push('Email is required.');
  if (submission.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(submission.email)) {
    errors.push('Email must be valid.');
  }
  if (submission.phone && !phonePattern.test(submission.phone)) {
    errors.push('Phone must contain only numbers, spaces, and + - ( ) characters.');
  }
  if (!allowedTypes.has(submission.submissionType)) {
    errors.push('Submission type must be enquiry, request, complaint, or feedback.');
  }
  if (!submission.subject) errors.push('Subject is required.');
  if (!submission.message) errors.push('Message is required.');

  return {
    isValid: errors.length === 0,
    errors,
    submission
  };
};
