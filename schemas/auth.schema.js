const z = require('zod');

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

module.exports = {
  loginSchema,
  recoveryPasswordSchema,
};
