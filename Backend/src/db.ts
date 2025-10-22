import * as mysql from 'mysql2/promise';
import * as dotenv from 'dotenv';
dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: +(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'tasksdb',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default pool;
