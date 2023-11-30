const { Professional } = require('../models/');

const getProfessionals = async (req, res) => {
	const { limit } = req.query;
	let professionals = [];

	if (!limit) {
		professionals = await Professional.find().sort({ createdAt: -1 });
	} else {
		professionals = await Professional.find()
			.sort({ createdAt: -1 })
			.limit(parseInt(limit));
	}
	res.json({
		status: 'success',
		msg: 'Ejercicios obtenidos',
		data: professionals,
	});
};

const getProfessional = async (req, res) => {
	const { id } = req.params;

	const professional = await Professional.findById(id);

	if (!professional) {
		return res.status(404).json({
			status: 'error',
			msg: 'Profesional no encontrado',
			data: { id },
		});
	}

	res.json({
		status: 'success',
		msg: 'Profesional obtenido',
		data: professional,
	});
};

const createProfessional = async (req, res) => {
	const { type, page, address, fullName, image } = req.body;

	
	try {
		const professional = new Professional({
			type,
			page,
			address,
			fullName,
			image,
		});

		const professionalSaved = await professional.save();

		res.json({
			status: 'success',
			msg: 'Profesional creado',
			data: professionalSaved.toJSON(),
		});
	} catch (error) {
		
		res
			.status(500)
			.json({ status: 'error', msg: 'Fallo del servidor', data: error });
	}
};

const updateProfessional = async (req, res) => {
	const { id } = req.params;
	const { ...rest } = req.body;

	const professionalUpdate = await Professional.findByIdAndUpdate(id, rest, {
		new: true,
	});

	res.json({
		professionalUpdate,
	});
};

const deleteProfessional = async (req, res) => {
	const { id } = req.params;

	const professional = await Professional.findByIdAndDelete(id);

	res.json({
		status: 'success',
		msg: 'Profesional eliminado',
		data: professional,
	});
};

module.exports = {
	getProfessionals,
	createProfessional,
	updateProfessional,
	deleteProfessional,
	getProfessional,
};
