const { Router } = require('express');
const {
  loginSchema,
  recoveryPasswordSchema,
  resetPasswordParamsSchema,
  resetPasswordSchema,
} = require('../schemas/auth.schema');
const { validateRequestBody, validateRequestParams } = require('../middlewares');
const { Auth } = require('../controllers');

const router = Router();

router.post('/login', validateRequestBody(loginSchema), Auth.login);

router.post('/logout', Auth.logout);

router.post(
  '/recovery-password',
  validateRequestBody(recoveryPasswordSchema),
  Auth.recoveryPassword
);

router.post(
  '/reset-password/:userId/:recoveryAccessToken',
  [
    validateRequestParams(resetPasswordParamsSchema),
    validateRequestBody(resetPasswordSchema),
  ],
  Auth.resetPassword
);

module.exports = router;
