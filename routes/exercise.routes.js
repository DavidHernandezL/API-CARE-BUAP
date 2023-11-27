const { Router } = require('express');

const { Exercise } = require('../controllers');

const { verifyAuthToken } = require('../middlewares');

const router = new Router();

router.get('/', verifyAuthToken, Exercise.getExercises);
router.get('/:id', verifyAuthToken, Exercise.getExercise);

router.post('/', verifyAuthToken, Exercise.createExercise);

router.put('/:id', verifyAuthToken, Exercise.updateExercise);

router.delete('/:id', verifyAuthToken, Exercise.deleteExercise);

module.exports = router;
