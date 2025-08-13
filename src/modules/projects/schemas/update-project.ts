import { z } from 'zod'

export const updateProjectSchema = z.object({
  name: z.string().min(1, { message: 'Nome é obrigatório' }).optional(),
  // URL da Imagem
  image: z.union([
    z.instanceof(File),
    z.string().transform((value) => value === '' ? undefined : value)
  ]).optional(),
})