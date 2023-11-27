const { Journal } = require('../models');

const getJournal = async (req, res) => {
	const { id } = req.user;
	const diary = await Journal.find({ user: id });
	res.json({ status: 'success', msg: 'Valores encontrados', data: diary });
};
const getJournalEntry = async (req, res) => {
	const { id } = req.user;
	const { journalId } = req.params;

	const journalEntry = await Journal.findOne({ user: id, _id: journalId });
	if (!journalEntry)
		return res.status(400).json({ msg: 'No existe la entrada de diario' });
	res.json({
		status: 'success',
		msg: 'Valores encontrados',
		data: journalEntry.toJSON(),
	});
};
const createJournalEntry = async (req, res) => {
	const { id } = req.user;
	const { title, description, date, mood } = req.body;
	const journalEntry = new Journal({
		title,
		description,
		date,
		mood,
		user: id,
	});
	await journalEntry.save();
	res.json(journalEntry);
};
const updateJournalEntry = async (req, res) => {
	const { journalId } = req.params;
	const { title, description, date, mood } = req.body;
	const journalEntry = await Journal.findByIdAndUpdate(
		journalId,
		{ title, description, date, mood },
		{ new: true },
	);
	if (!journalEntry)
		return res.status(400).json({ msg: 'No existe la entrada de diario' });
	res.json(journalEntry);
};

module.exports = {
	getJournal,
	getJournalEntry,
	createJournalEntry,
	updateJournalEntry,
};
