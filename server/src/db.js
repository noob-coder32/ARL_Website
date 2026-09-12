import sql from 'mssql';

const parseBoolean = (value, fallback) => {
  if (value === undefined) {
    return fallback;
  }

  return String(value).toLowerCase() === 'true';
};

const [serverHost, instanceName] = String(process.env.DB_SERVER || '').split('\\');
const configuredPort = !instanceName && process.env.DB_PORT ? Number(process.env.DB_PORT) : undefined;

const dbConfig = {
  server: serverHost,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  options: {
    encrypt: parseBoolean(process.env.DB_ENCRYPT, false),
    trustServerCertificate: parseBoolean(process.env.DB_TRUST_SERVER_CERTIFICATE, true),
    ...(instanceName ? { instanceName } : {})
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  }
};

if (configuredPort) {
  dbConfig.port = configuredPort;
}

let poolPromise;

export const getPool = async () => {
  if (!poolPromise) {
    poolPromise = sql.connect(dbConfig);
  }

  return poolPromise;
};

export { sql };
