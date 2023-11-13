const { Router } = require('express');
const { User } = require('../controllers');
const { createUserSchema, updateUserSchema } = require('../schemas/user');
const { restrict, validateRequestBody } = require('../middlewares');

const router = Router();

router.get('/', restrict, User.getUser);

router.post('/', validateRequestBody(createUserSchema), User.createUser);

router.put('/', restrict, validateRequestBody(updateUserSchema), User.updateUser);

module.exports = router;
