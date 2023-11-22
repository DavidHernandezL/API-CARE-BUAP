const { Router } = require('express');

const { Professional } = require('../controllers');

const {
  verifyAuthToken,
  validateRequestParams,
  validateRequestBody,
} = require('../middlewares');
const { chatParamsSchema, chatSchema, messageSchema } = require('../schemas/chat.schema');

const router = Router();

router.get('/', verifyAuthToken, Professional.getProfessionals);
router.get('/:id', verifyAuthToken, Professional.getProfessional);

router.post('/', verifyAuthToken, Professional.createProfessional);

router.put('/:id', verifyAuthToken, Professional.updateProfessional);

router.delete('/:id', verifyAuthToken, Professional.deleteProfessional);

module.exports = router;
