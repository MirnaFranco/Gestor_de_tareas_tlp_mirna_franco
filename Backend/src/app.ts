import express from 'express';
import dotenv from 'dotenv';
import tasksRouter from '../routes/tasks.js';
import bodyParser from 'body-parser';

dotenv.config();

const app = express();
const port = +(process.env.API_PORT || 3000);

app.use(bodyParser.json());
app.use('/api/tasks', tasksRouter);

app.get('/health', (_req, res) => res.json({ status: 'ok' }));

app.listen(port, '0.0.0.0', () => {
  console.log(`API running on port ${port}`);
});
