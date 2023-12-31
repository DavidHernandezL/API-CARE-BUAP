const { Router } = require('express');

const { Chat } = require('../controllers');

const {
	verifyAuthToken,
	validateRequestParams,
	validateRequestBody,
} = require('../middlewares');
const { chatParamsSchema, chatSchema } = require('../schemas/chat.schema');

const router = new Router();

router.get('/', verifyAuthToken, Chat.getChats);

router.get(
	'/:chatId',
	verifyAuthToken,
	validateRequestParams(chatParamsSchema),
	Chat.getChat,
);

router.post(
	'/',
	verifyAuthToken,
	validateRequestBody(chatSchema),
	Chat.createChat,
);

router.post(
	'/:chatId',
	verifyAuthToken,
	validateRequestParams(chatParamsSchema),
	Chat.addMessage,
);
router.delete(
	'/:chatId',
	verifyAuthToken,
	validateRequestParams(chatParamsSchema),
	Chat.deleteChat,
);

module.exports = router;
