const { Schema, model } = require('mongoose');

const diarySchema = new Schema(
	{
		title: {
			type: String,
			required: [true, 'El titulo es obligatorio'],
		},
		description: {
			type: String,
			required: [true, 'La descripción es obligatoria'],
		},
		date: {
			type: Date,
			default: Date.now,
		},
		mood: {
			type: String,
			required: [true, 'El estado de animo es obligatorio'],
		},
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
	},
	{
		timestamps: true,
	},
);

diarySchema.methods.toJSON = function () {
	const { _id, date, ...user } = this.toObject();
	user.uid = _id;
	user.date = date.toLocaleString('es-MX', {
		day: 'numeric',
		month: 'numeric',
		year: 'numeric',
	});
	return user;
};

module.exports = model('Journal', diarySchema);
