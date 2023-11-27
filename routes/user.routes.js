const { Router } = require('express');
const { User } = require('../controllers');
const {
	createUserSchema,
	updateUserSchema,
} = require('../schemas/user.schema');
const { verifyAuthToken, validateRequestBody } = require('../middlewares');

const router = new Router();

router.get('/', verifyAuthToken, User.getUsers);

router.post('/', validateRequestBody(createUserSchema), User.createUser);

router.put(
	'/',
	verifyAuthToken,
	validateRequestBody(updateUserSchema),
	User.updateUser,
);

module.exports = router;
