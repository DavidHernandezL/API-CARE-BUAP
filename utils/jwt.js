const jwt = require('jsonwebtoken');

const createAccessToken = (payload, expiresIn) => {
	return new Promise((resolve, reject) => {
		jwt.sign(payload, process.env.SECRET, { expiresIn }, (err, token) => {
			if (err) {
				reject(new Error('No se pudo generar el token'));
			} else {
				resolve(token);
			}
		});
	});
};

const verifyAccessToken = token => {
	return new Promise((resolve, reject) => {
		jwt.verify(token, process.env.SECRET, (err, decoded) => {
			if (err) {
				reject(new Error('No se pudo generar el token'));
			} else {
				resolve(decoded);
			}
		});
	});
};

module.exports = {
	createAccessToken,
	verifyAccessToken,
};
