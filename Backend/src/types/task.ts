export interface Task {
  id?: number;
  titulo: string;
  descripcion?: string | null;
  estado: 'pendiente' | 'completada';
  created_at?: string;
  updated_at?: string;
}

// DTOs
export type CreateTaskDTO = Omit<Task, 'id' | 'created_at' | 'updated_at'>;
export type UpdateTaskDTO = Partial<CreateTaskDTO>;
