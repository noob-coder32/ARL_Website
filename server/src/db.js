import pg from 'pg';

const { Pool } = pg;

const parseBoolean = (value, fallback = false) => {
  if (value === undefined || value === null) {
    return fallback;
  }
  return String(value).toLowerCase() === 'true';
};

const buildPoolConfig = () => {
  if (process.env.DATABASE_URL) {
    return {
      connectionString: process.env.DATABASE_URL,
      ssl: parseBoolean(process.env.PGSSL || process.env.DB_SSL, false)
        ? { rejectUnauthorized: false }
        : false,
    };
  }

  const host = process.env.PGHOST || process.env.DB_SERVER || process.env.DB_HOST || 'localhost';
  const port = Number(process.env.PGPORT || process.env.DB_PORT || 5432);
  const user = process.env.PGUSER || process.env.DB_USER || 'postgres';
  const password = process.env.PGPASSWORD || process.env.DB_PASSWORD || '';
  const database = process.env.PGDATABASE || process.env.DB_NAME || 'arl_website';
  const enableSsl = parseBoolean(process.env.PGSSL || process.env.DB_SSL, false);

  return {
    host,
    port,
    user,
    password,
    database,
    ssl: enableSsl ? { rejectUnauthorized: false } : false,
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000,
  };
};

let pool;

export const getPool = async () => {
  if (!pool) {
    pool = new Pool(buildPoolConfig());

    pool.on('error', (err) => {
      console.error('Unexpected error on idle PostgreSQL client:', err);
    });

    // Test initial connection
    const client = await pool.connect();
    client.release();
  }

  return pool;
};

export const query = async (text, params) => {
  const poolInstance = await getPool();
  return poolInstance.query(text, params);
};

export { pg };
