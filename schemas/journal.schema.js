const { z } = require('zod');

const createJournalSchema = z.object({
  title: z
    .string({ required_error: 'El título es requerido' })
    .min(3, 'El título debe tener al menos 3 caracteres'),
  description: z
    .string({ required_error: 'La descripción es requerida' })
    .min(3, 'La descripción debe tener al menos 3 caracteres'),
  date: z
    .string({ required_error: 'La fecha es requerida' })
    .min(3, 'La fecha debe tener al menos 3 caracteres')
    .optional(),
  mood: z
    .string({ required_error: 'El estado de ánimo es requerido' })
    .min(3, 'El estado de ánimo debe tener al menos 3 caracteres'),
});

const updateJournalSchema = z.object({
  title: z.string().min(3, 'El título debe tener al menos 3 caracteres').optional(),
  description: z
    .string()
    .min(3, 'La descripción debe tener al menos 3 caracteres')
    .optional(),
  date: z.string().min(3, 'La fecha debe tener al menos 3 caracteres').optional(),
  mood: z
    .string()
    .min(3, 'El estado de ánimo debe tener al menos 3 caracteres')
    .optional(),
});

module.exports = {
  createJournalSchema,
  updateJournalSchema,
};
