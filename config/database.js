const mongoose = require('mongoose');

const createConnectionDB = () => {
	try {
		mongoose.connect(process.env.MONGO_URI);
		console.log('Conexión a la base de datos exitosa');
	} catch (error) {
		console.log(error);
		throw new Error('Error en la conexión a la base de datos');
	}
};

module.exports = {
	createConnectionDB,
};
