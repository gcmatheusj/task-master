import { TaskStatus } from "@prisma/client";
import { z } from "zod";

export const createTaskSchema = z.object({
  name: z.string().trim().min(1, 'Nome é obrigatório'),
  status: z.nativeEnum(TaskStatus, { required_error: 'Status é obrigatório' }),
  projectId: z.string().trim().min(1, 'ID do projeto é obrigatório'),
  teamId: z.string().trim().min(1, 'ID do time é obrigatório'),
  assigneeId: z.string().trim().min(1, 'ID do dono é obrigatório'),
  dueDate: z.coerce.date(),
  description: z.string().optional()
})