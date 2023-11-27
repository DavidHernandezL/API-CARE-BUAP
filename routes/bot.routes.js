const { Router } = require('express');
const { Bot } = require('../controllers');

const {
  verifyAuthToken,
  validateRequestParams,
  validateRequestBody,
} = require('../middlewares');

const router = Router();

router.get('/', verifyAuthToken, Bot.botResponse);

module.exports = router;
