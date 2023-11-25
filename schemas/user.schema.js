const { z } = require('zod');

const createUserSchema = z.object({
  fullName: z
    .string({ required_error: 'El nombre es requerido' })
    .min(3, 'El nombre debe tener al menos 3 caracteres'),
  studentId: z
    .number({
      invalid_type_error: 'La matrícula debe ser un número',
      required_error: 'La matrícula es requerida',
    })
    .positive('No puede ser negativo')
    .int('La matrícula debe ser un número entero')
    .min(100000000, 'La matrícula debe tener 9 dígitos'),
  email: z
    .string({ required_error: 'El correo es requerido' })
    .email('El correo no es válido')
    .refine(
      (data) => {
        if (data.includes('@alumno.buap.mx') || data.includes('@correo.buap.mx')) {
          return true;
        } else {
          return false;
        }
      },
      { message: 'El correo debe ser institucional' }
    ),
  password: z
    .string({
      required_error: 'La contraseña es requerida',
    })
    .min(6, 'La contraseña debe tener mínimo 6 caracteres'),
});

const updateUserSchema = z.object({
  fullName: z.string().min(3, 'El nombre debe tener al menos 3 caracteres').optional(),
  password: z.string().min(6, 'La contraseña debe tener mínimo 6 caracteres').optional(),
  img: z.string().url('La imagen debe ser una url valida').optional(),
});

module.exports = {
  createUserSchema,
  updateUserSchema,
};
