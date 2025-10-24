import type { Request, Response } from 'express';
import { pool, initializeDatabase } from '../db.js';
import type { CreateTaskDTO, UpdateTaskDTO } from '../types/task.js';

// Listar todas las tareas
export const getTasks = async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.query('SELECT * FROM tasks ORDER BY id DESC');
    return res.json(rows);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// Obtener una tarea por id
export const getTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const [rows]: any = await pool.query('SELECT * FROM tasks WHERE id = ?', [id]);
    if ((rows as any[]).length === 0) return res.status(404).json({ message: 'Tarea no encontrada' });
    return res.json(rows[0]);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// Crear tarea
export const createTask = async (req: Request, res: Response) => {
  const data: CreateTaskDTO = req.body;
  if (!data.titulo) return res.status(400).json({ message: 'El título es obligatorio' });

  try {
    const [result]: any = await pool.query('INSERT INTO tasks (titulo, descripcion, estado) VALUES (?, ?, ?)', [
      data.titulo,
      data.descripcion || null,
      data.estado || 'pendiente'
    ]);
    const insertId = result.insertId;
    const [rows]: any = await pool.query('SELECT * FROM tasks WHERE id = ?', [insertId]);
    return res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// Actualizar tarea
export const updateTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data: UpdateTaskDTO = req.body;
  try {
    const [result]: any = await pool.query('UPDATE tasks SET titulo = COALESCE(?, titulo), descripcion = COALESCE(?, descripcion), estado = COALESCE(?, estado) WHERE id = ?', [
      data.titulo,
      data.descripcion,
      data.estado,
      id
    ]);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Tarea no encontrada' });
    const [rows]: any = await pool.query('SELECT * FROM tasks WHERE id = ?', [id]);
    return res.json(rows[0]);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// Borrar tarea
export const deleteTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const [result]: any = await pool.query('DELETE FROM tasks WHERE id = ?', [id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Tarea no encontrada' });
    return res.status(204).send();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};
