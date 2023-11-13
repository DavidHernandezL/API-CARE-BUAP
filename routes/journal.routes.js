const { Router } = require('express');
const { verifyAuthToken, validateRequestBody } = require('../middlewares');
const { Journal } = require('../controllers');
const { createJournalSchema, updateJournalSchema } = require('../schemas/journal.schema');
const router = Router();

router.get('/', verifyAuthToken, Journal.getJournal);
router.get('/:diaryId', verifyAuthToken, Journal.getJournalEntry);
router.post(
  '/',
  verifyAuthToken,
  validateRequestBody(createJournalSchema),
  Journal.createJournalEntry
);
router.put(
  '/:diaryId',
  verifyAuthToken,
  validateRequestBody(updateJournalSchema),
  Journal.updateJournalEntry
);

module.exports = router;
