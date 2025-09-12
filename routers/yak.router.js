const router = require('express').Router();
const yakController = require('../controllers/yak.controller');

router.get('/stock/:days', yakController.stockYak);
router.get('/herd/:days', yakController.herdYak);

router.get('/', yakController.getALLYaks);
router.get('/:id', yakController.getYakById);
router.post('/', yakController.createYak);
router.patch('/:id', yakController.updateYak);
router.delete('/:id', yakController.deleteYak);

module.exports = router;