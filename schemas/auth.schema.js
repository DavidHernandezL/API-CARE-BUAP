const z = require('zod');
const mongoose = require('mongoose');

const loginSchema = z.object({
  studentId: z
    .number({
      invalid_type_error: 'La matricula debe ser un número',
      required_error: 'La matricula es requerida',
    })
    .positive('No puede ser negativo'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

const recoveryPasswordSchema = z.object({
  email: z
    .string()
    .email('El correo no es válido')
    .refine(
      (data) => data.includes('@alumno.buap.mx') || data.includes('@correo.buap.mx'),
      { message: 'El correo debe ser institucional' }
    ),
});

const resetPasswordSchema = z.object({
  password: z
    .string({
      required_error: 'La contraseña es requerida',
    })
    .min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

const resetPasswordParamsSchema = z.object({
  userId: z.string().refine((data) => mongoose.Types.ObjectId.isValid(data), {
    message: 'El id no es válido',
  }),
});

module.exports = {
  loginSchema,
  recoveryPasswordSchema,
  resetPasswordSchema,
  resetPasswordParamsSchema,
};
