import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

export let pool: mysql.Pool;

export async function initializeDatabase() {
  // Convertimos el puerto a number y ponemos valores por defecto
  const port = process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306;

  if (!process.env.DB_HOST || !process.env.DB_USER || !process.env.DB_PASSWORD || !process.env.DB_NAME) {
    throw new Error('Faltan variables de entorno de DB');
  }

  pool = await mysql.createPool({
    host: process.env.DB_HOST,
    port: port,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  await pool.query(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INT AUTO_INCREMENT PRIMARY KEY,
      titulo VARCHAR(255) NOT NULL,
      descripcion TEXT,
      estado VARCHAR(50) NOT NULL
    )
  `);

  console.log('🗄️ Tabla "tasks" verificada o creada exitosamente.');
}
