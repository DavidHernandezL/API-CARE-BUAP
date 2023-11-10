const { Router } = require('express');
const { loginSchema, recoveryPasswordSchema } = require('../schemas/auth.schema');
const { validateRequestBody } = require('../middlewares');
const { Auth } = require('../controllers');

const router = Router();

router.post('/login', validateRequestBody(loginSchema), Auth.login);

router.post('/logout', Auth.logout);

router.post(
  '/recovery-password',
  validateRequestBody(recoveryPasswordSchema),
  Auth.recoveryPassword
);

//TODO: Especificar las validaciones para resetPassword
router.post('/reset-password/', Auth.resetPassword);

module.exports = router;
