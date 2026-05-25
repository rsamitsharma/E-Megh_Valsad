import dotenv from 'dotenv';

dotenv.config();

const sqlConfig = {
  user: process.env.DB_USER as string,
  password: process.env.DB_PASSWORD as string,
  database: process.env.DB_NAME as string,
  server: process.env.DB_SERVER as string,
  pool: {
    max: 100,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  options: {
    encrypt: false, // for azure
  },
};

export default sqlConfig;
