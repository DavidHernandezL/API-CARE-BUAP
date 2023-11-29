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
	messages: z.array(),
});

module.exports = {
	chatParamsSchema,
	chatSchema,
	messageSchema,
};
