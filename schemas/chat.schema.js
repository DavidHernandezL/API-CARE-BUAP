const mongoose = require('mongoose');
const z = require('zod');

const chatParamsSchema = z.object({
  chatId: z
    .string({
      required_error: 'El id del usuario es requerido',
    })
    .refine((data) => mongoose.Types.ObjectId.isValid(data), {
      message: 'El id no es válido',
    }),
});

const chatSchema = z.object({
  nameChat: z
    .string({
      required_error: 'El nombre del chat es requerido',
    })
    .min(3, 'El nombre del chat debe tener al menos 3 caracteres'),
});

const messageSchema = z.object({
  content: z
    .string({
      required_error: 'El contenido del mensaje es requerido',
    })
    .min(1, 'El contenido del mensaje debe tener al menos 1 carácter'),
});

module.exports = {
  chatParamsSchema,
  chatSchema,
  messageSchema,
};
