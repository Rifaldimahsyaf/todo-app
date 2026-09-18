import { z } from 'zod';

export const todoSchema = z.object({
  text: z
    .string()
    .min(3, 'Todo minimal 3 karakter')
    .max(100, 'Todo maksimal 100 karakter'),
});

export type TodoFormData = z.infer<typeof todoSchema>;