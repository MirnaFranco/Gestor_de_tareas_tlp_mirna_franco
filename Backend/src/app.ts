import express from 'express';
import dotenv from 'dotenv';
import tasksRouter from './routes/tasks.js';
import bodyParser from 'body-parser';
import { initializeDatabase } from './db.js';

dotenv.config();

const app = express();
const port = +(process.env.API_PORT || 3000);

// Middlewares
app.use(bodyParser.json());

// Rutas
app.use('/api/tasks', tasksRouter);

app.get('/health', (_req, res) => res.json({ status: 'ok' }));

// Inicialización del servidor + DB
async function startServer() {
  try {
    await initializeDatabase(); // crea tablas si no existen
    app.listen(port, '0.0.0.0', () => {
      console.log(`🚀 Servidor backend escuchando en el puerto ${port}`);
    });
  } catch (err) {
    console.error('Error inicializando la base de datos:', err);
    process.exit(1);
  }
}

startServer();
