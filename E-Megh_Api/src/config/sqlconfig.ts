import dotenv from 'dotenv';

dotenv.config();

const sqlConfig = {
  // user: 'rs_development',
  user: 'rsuser',
  password: 'P8L5fE123456_',
  database: 'Valsad_Disaster_Mgt',
  // database: 'Daman_Disaster_Mgt',
  // user: process.
  server: '100.100.100.1',
  //server: "202.47.117.214",
  // server: '202.71.24.172',
  //  server: '202.71.24.172',
  // server: '192.168.27.3',
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
