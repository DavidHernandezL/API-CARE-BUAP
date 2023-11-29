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
			},
		],
	},
	{
		timestamps: true,
	},
);

chatSchema.methods.toJSON = function () {
	// eslint-disable-next-line no-unused-vars
	const { __v, ...chat } = this.toObject();

	chat.messages = chat.messages.map(message => ({
		role: message.role,
		content: message.content,
	}));
	return chat;
};

module.exports = model('Chat', chatSchema);
