const { Router } = require('express');
const {
	loginSchema,
	recoveryPasswordSchema,
	resetPasswordParamsSchema,
	resetPasswordSchema,
} = require('../schemas/auth.schema');
const {
	validateRequestBody,
	validateRequestParams,
	verifyAuthToken,
} = require('../middlewares');
const { Auth } = require('../controllers');

const router = new Router();

router.get('/verify', Auth.verifyToken);

router.post('/login', validateRequestBody(loginSchema), Auth.login);

router.post('/logout', Auth.logout);

router.post(
	'/recovery-password',
	validateRequestBody(recoveryPasswordSchema),
	Auth.recoveryPassword,
);

router.post(
	'/reset-password/:userId/:recoveryAccessToken',
	[
		validateRequestParams(resetPasswordParamsSchema),
		validateRequestBody(resetPasswordSchema),
	],
	Auth.resetPassword,
);

router.post('/change-password', verifyAuthToken, Auth.changePassword);

module.exports = router;
