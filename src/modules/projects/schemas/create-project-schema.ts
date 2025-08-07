import { z } from 'zod'

export const createProjectSchema = z.object({
  name: z.string().min(1, { message: 'Nome é obrigatório' }),
  teamId: z.string(),
  // URL da Imagemw
  image: z.union([
    z.instanceof(File),
    z.string().transform((value) => value === '' ? undefined : value)
  ]).optional(),
})