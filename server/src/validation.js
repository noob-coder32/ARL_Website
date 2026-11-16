const allowedTypes = new Set(['enquiry', 'request', 'complaint', 'feedback', 'dealership']);

export const LIMITS = { name: 120, email: 180, phone: 40, subject: 180, message: 5000 };

const normalizeText = (value) => String(value ?? '').trim();

// ---------- Email ----------
const EMAIL_LOCAL = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*$/;
const DOMAIN_LABEL = /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/;
const TLD = /^(?:[a-z]{2,63}|xn--[a-z0-9-]{1,59})$/;

export const validateEmail = (value) => {
  const email = normalizeText(value).toLowerCase();
  if (!email) return { ok: false, error: 'Email is required.' };

  const invalid = { ok: false, error: 'Enter a valid email address, e.g. name@example.com.' };
  if (email.length > LIMITS.email) return { ok: false, error: `Email must be at most ${LIMITS.email} characters.` };

  const parts = email.split('@');
  if (parts.length !== 2) return invalid;

  const [local, domain] = parts;
  if (!local || local.length > 64 || !EMAIL_LOCAL.test(local)) return invalid;

  const labels = domain.split('.');
  if (
    labels.length < 2 ||
    domain.length > 253 ||
    !labels.every((label) => DOMAIN_LABEL.test(label)) ||
    !TLD.test(labels[labels.length - 1])
  ) {
    return invalid;
  }

  return { ok: true, email };
};

// ---------- Phone (optional field) ----------
const PHONE_CHARS = /^\+?[0-9\s\-()]+$/;
const PHONE_HELP =
  'Enter a valid phone number: a 10-digit Indian number (optionally with +91 or 0), or an international number starting with +country code.';

export const validatePhone = (value) => {
  const raw = normalizeText(value);
  if (!raw) return { ok: true, phone: '' };
  if (raw.length > LIMITS.phone) return { ok: false, error: `Phone must be at most ${LIMITS.phone} characters.` };
  if (!PHONE_CHARS.test(raw)) return { ok: false, error: PHONE_HELP };

  const digits = raw.replace(/\D/g, '');
  const hasPlus = raw.startsWith('+');
  let national;

  if (hasPlus) {
    if (digits.startsWith('91')) {
      national = digits.slice(2);
    } else if (digits.length >= 8 && digits.length <= 15 && !digits.startsWith('0')) {
      return { ok: true, phone: `+${digits}` }; // other countries (E.164 length)
    } else {
      return { ok: false, error: PHONE_HELP };
    }
  } else if (digits.length === 12 && digits.startsWith('91')) {
    national = digits.slice(2);
  } else if (digits.length === 11 && digits.startsWith('0')) {
    national = digits.slice(1); // 0 + 10 digits (STD / trunk prefix)
  } else {
    national = digits;
  }

  const looksValid = /^[1-9]\d{9}$/.test(national) && !/^(\d)\1{9}$/.test(national);
  return looksValid ? { ok: true, phone: `+91${national}` } : { ok: false, error: PHONE_HELP };
};

// ---------- Submission ----------
export const validateSubmission = (body = {}) => {
  const errors = [];
  const fieldErrors = {};
  const addError = (field, message) => {
    errors.push(message);
    fieldErrors[field] = message;
  };

  const name = normalizeText(body.name);
  const subject = normalizeText(body.subject);
  const message = normalizeText(body.message);
  const submissionType = normalizeText(body.submissionType).toLowerCase();

  if (!name) addError('name', 'Name is required.');
  else if (name.length > LIMITS.name) addError('name', `Name must be at most ${LIMITS.name} characters.`);

  const emailResult = validateEmail(body.email);
  if (!emailResult.ok) addError('email', emailResult.error);

  const phoneResult = validatePhone(body.phone);
  if (!phoneResult.ok) addError('phone', phoneResult.error);

  if (!allowedTypes.has(submissionType)) {
    addError('submissionType', 'Submission type must be enquiry, request, complaint, feedback, or dealership.');
  }

  if (!subject) addError('subject', 'Subject is required.');
  else if (subject.length > LIMITS.subject) addError('subject', `Subject must be at most ${LIMITS.subject} characters.`);

  if (!message) addError('message', 'Message is required.');
  else if (message.length > LIMITS.message) addError('message', `Message must be at most ${LIMITS.message} characters.`);

  return {
    isValid: errors.length === 0,
    errors,
    fieldErrors,
    submission: {
      name,
      email: emailResult.email ?? '',
      phone: phoneResult.phone ?? '',
      submissionType,
      subject,
      message
    }
  };
};