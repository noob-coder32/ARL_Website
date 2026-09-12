import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET?.trim();
const JWT_EXPIRE = process.env.JWT_EXPIRE || '24h';

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET must be configured in the server environment.');
}

/**
 * Hash a plain text password using bcryptjs
 * @param {string} password - Plain text password
 * @returns {Promise<string>} Hashed password
 */
export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

/**
 * Compare plain text password with hashed password
 * @param {string} plainPassword - Plain text password to verify
 * @param {string} hashedPassword - Hashed password from database
 * @returns {Promise<boolean>} True if passwords match
 */
export const verifyPassword = async (plainPassword, hashedPassword) => {
  return bcrypt.compare(plainPassword, hashedPassword);
};

/**
 * Generate JWT token for authenticated user
 * @param {object} payload - User data to encode in token
 * @returns {string} JWT token
 */
export const generateToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRE });
};

/**
 * Verify and decode JWT token
 * @param {string} token - JWT token to verify
 * @returns {object|null} Decoded payload or null if invalid
 */
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    console.error('Token verification error:', error.message);
    return null;
  }
};

/**
 * Middleware to authenticate requests using JWT token
 * Expects token in Authorization header: "Bearer <token>"
 */
export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      message: 'Unauthorized. Missing or invalid authorization header.'
    });
  }

  const token = authHeader.substring(7); // Remove "Bearer " prefix
  const decoded = verifyToken(token);

  if (!decoded) {
    return res.status(401).json({
      message: 'Unauthorized. Invalid or expired token.'
    });
  }

  // Attach user info to request object
  req.user = decoded;
  next();
};

/**
 * Middleware to check if user has required role
 * @param {...string} allowedRoles - Role(s) that are allowed
 */
export const requireRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized. No user context.' });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        message: `Forbidden. Required role(s): ${allowedRoles.join(', ')}`
      });
    }

    next();
  };
};
