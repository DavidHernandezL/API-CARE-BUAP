const { Schema, model } = require('mongoose');

const chatSchema = new Schema(
	{
		nameChat: {
			type: String,
			required: [true, 'Name chat is required'],
		},
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: [true, 'User is required'],
		},
		messages: [
			{
				role: {
					type: String,
					required: [true, 'User is required'],
				},
				content: {
					type: String,
					required: [true, 'Message is required'],
				},
				date: {
					type: Date,
					default: Date.now,
				},
			},
		],
	},
	{
		timestamps: true,
	},
);

module.exports = model('Chat', chatSchema);
