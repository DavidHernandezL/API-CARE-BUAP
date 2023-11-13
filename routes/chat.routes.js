const { Router } = require('express');

const { Chat } = require('../controllers');

const {
  verifyAuthToken,
  validateRequestParams,
  validateRequestBody,
} = require('../middlewares');
const { chatParamsSchema, chatSchema, messageSchema } = require('../schemas/chat.schema');

const router = Router();

router.get('/', verifyAuthToken, Chat.getChats);

router.get(
  '/:chatId',
  verifyAuthToken,
  validateRequestParams(chatParamsSchema),
  Chat.getChat
);

router.post('/', verifyAuthToken, validateRequestBody(chatSchema), Chat.createChat);

router.post(
  '/:chatId',
  verifyAuthToken,
  validateRequestParams(chatParamsSchema),
  validateRequestBody(messageSchema),
  Chat.addMessage
);
router.delete(
  '/:chatId',
  verifyAuthToken,
  validateRequestParams(chatParamsSchema),
  Chat.deleteChat
);

module.exports = router;
