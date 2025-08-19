import { TaskStatus } from "@prisma/client";
import { z } from "zod";

export const updateTaskSchema = z.object({
  name: z.string().optional(),
  status: z.nativeEnum(TaskStatus, { required_error: 'Status é obrigatório' }).optional(),
  projectId: z.string().optional(),
  teamId: z.string().min(1, 'ID do time é obrigatório'),
  assigneeId: z.string().optional(),
  dueDate: z.coerce.date().optional(),
  description: z.string().optional()
})