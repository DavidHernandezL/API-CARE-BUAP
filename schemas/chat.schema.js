const mongoose = require('mongoose');
const z = require('zod');

const chatParamsSchema = z.object({
  chatId: z.string({
    required_error: 'El id del usuario es requerido',
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
  content: z.object({
    user: z.string({
      required_error: 'El usuario es requerido',
    }),
    message: z.string({
      required_error: 'El mensaje es requerido',
    }),
  }),
});

module.exports = {
  chatParamsSchema,
  chatSchema,
  messageSchema,
};
