const { z } = require('zod');

const createUserSchema = z.object({
  fullName: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
  studentId: z
    .number({
      invalid_type_error: 'La matricula debe ser un número',
      required_error: 'La matricula es requerida',
    })
    .positive('No puede ser negativo')
    .int('La matricula debe ser un número entero')
    .min(200000000, 'La matricula debe tener 10 caracteres'),
  email: z
    .string()
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
    )
    .refine((data) => {
      if (data.includes('@alumno.buap.mx')) {
        return data.includes('2021') || data.includes('2022');
      } else {
        return true;
      }
    }),
  password: z.string().min(6, 'La contraseña debe tener mínimo 6 caracteres'),
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
