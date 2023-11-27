const bcrypt = require('bcryptjs');
const { User } = require('../models');

const { createAccessToken, verifyAccessToken } = require('../utils');
const { transporter, htmlMail } = require('../config');

const login = async (req, res) => {
	try {
		const { studentId, password } = req.body;
		const userFounded = await User.findOne({ studentId });

		if (!userFounded) {
			return res
				.status(400)
				.json({ status: 'error', msg: 'Matrícula o contraseña incorrectos.' });
		}

		const isMatch = bcrypt.compareSync(password, userFounded.password);

		if (!isMatch) {
			return res
				.status(400)
				.json({ status: 'error', msg: 'Matrícula o contraseña incorrectos.' });
		}

		const token = await createAccessToken({ id: userFounded._id }, '1h');
		res.cookie('token', token, {
			httpOnly: false,
			secure: true,
			sameSite: 'none',
		});
		res.json({
			status: 'success',
			msg: 'Usuario autenticado',
			data: userFounded.toJSON(),
		});
	} catch (error) {
		return res.status(500).json({
			msg: 'Fallo en el servidor',
		});
	}
};

const logout = async (req, res) => {
	res.cookie('token', '', { expires: new Date(0) });
	res.json({ msg: 'Sesión terminada' });
};

const recoveryPassword = async (req, res) => {
	const { email } = req.body;

	const user = await User.findOne({ email });

	if (!user) {
		return res.status(400).json({ msg: 'El correo no esta registrado' });
	}

	const recoveryAccessToken = await createAccessToken({ id: user._id }, '1h');
	const resetPasswordUrl = `http://${process.env.FRONTEND_URL}/reset-password/${user._id}/${recoveryAccessToken}`;

	const mailOptions = {
		from: 'CARE BUAP <carebuap@gmail.com>',
		to: email,
		subject: 'Recuperación de contraseña',
		html: htmlMail(user.fullName, resetPasswordUrl),
	};

	transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
			return res.status(400).json({
				errors: [{ msg: 'Error al enviar el correo' }],
			});
		} else {
			res.json({ status: 'OK', msg: 'Correo enviado' });
		}
	});
};

const resetPassword = async (req, res) => {
	const { userId, recoveryAccessToken } = req.params;
	const { password } = req.body;

	const isTokenValid = await verifyAccessToken(recoveryAccessToken);

	if (!isTokenValid) {
		return res.status(400).json({
			errors: [{ msg: 'El token no es válido' }],
		});
	}

	const userFounded = await User.findById(userId);
	if (!userFounded) {
		return res.status(400).json({
			errors: [{ msg: 'El usuario no existe' }],
		});
	}

	try {
		const salt = bcrypt.genSaltSync();
		const newPassword = bcrypt.hashSync(password, salt);
		userFounded.password = newPassword;

		await userFounded.save();

		res.json({ status: 'OK', message: 'Contraseña actualizada' });
	} catch (error) {
		return res.status(500).json({
			errors: [{ msg: 'Error en el servidor' }],
		});
	}
};

const verifyToken = async (req, res) => {
	const { token } = req.cookies;

	if (!token) {
		return res.status(401).json({ status: 'error', msg: 'Token no válido' });
	}

	try {
		const { id } = await verifyAccessToken(token);
		const userFounded = await User.findById(id);

		if (!userFounded) {
			return res.status(401).json({ status: 'error', msg: 'Token no válido' });
		}

		res.json({ status: 'OK', msg: 'Token válido', data: userFounded.toJSON() });
	} catch (error) {
		return res.status(401).json({ status: 'error', msg: 'Token no válido' });
	}
};

module.exports = {
	login,
	logout,
	recoveryPassword,
	resetPassword,
	verifyToken,
};
