const { Router } = require('express');

const { Professional } = require('../controllers');

const { verifyAuthToken } = require('../middlewares');

const router = new Router();

router.get('/', verifyAuthToken, Professional.getProfessionals);
router.get('/:id', verifyAuthToken, Professional.getProfessional);

router.post('/', verifyAuthToken, Professional.createProfessional);

router.put('/:id', verifyAuthToken, Professional.updateProfessional);

router.delete('/:id', verifyAuthToken, Professional.deleteProfessional);

module.exports = router;
