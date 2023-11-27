const { Router } = require('express');
const { verifyAuthToken, validateRequestBody } = require('../middlewares');
const { Journal } = require('../controllers');
const {
	createJournalSchema,
	updateJournalSchema,
} = require('../schemas/journal.schema');
const router = new Router();

router.get('/', verifyAuthToken, Journal.getJournal);
router.get('/:journalId', verifyAuthToken, Journal.getJournalEntry);
router.post(
	'/',
	verifyAuthToken,
	validateRequestBody(createJournalSchema),
	Journal.createJournalEntry,
);
router.put(
	'/:journalId',
	verifyAuthToken,
	validateRequestBody(updateJournalSchema),
	Journal.updateJournalEntry,
);

module.exports = router;
