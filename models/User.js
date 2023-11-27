const { Schema, model } = require('mongoose');

const userSchema = new Schema(
	{
		fullName: {
			type: String,
			required: [true, 'El nombre es obligatorio'],
		},
		studentId: {
			type: Number,
			required: [true, 'La matricula es obligatoria'],
			unique: true,
		},
		email: {
			type: String,
			required: [true, 'El correo es obligatorio'],
			unique: true,
		},
		password: {
			type: String,
			required: [true, 'La contraseña es obligatoria'],
		},
		role: {
			type: String,
			default: 'USER_ROLE',
			enum: ['ADMIN_ROLE', 'USER_ROLE'],
		},
		image: {
			type: String,
		},
	},
	{
		timestamps: true,
	},
);

userSchema.methods.toJSON = function () {
	// eslint-disable-next-line no-unused-vars
	const { __v, password, _id, ...user } = this.toObject();

	user.uid = _id;
	return user;
};

module.exports = model('User', userSchema);
