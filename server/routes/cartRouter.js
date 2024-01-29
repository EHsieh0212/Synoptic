const { Router } = require('express');
const router = Router();
const { asyncHandler } = require('../utils/asyncHandler');
const checkSession = require('../utils/checkSession');
const CartIndexController = require('../controllers/IndexController');
const CartUpdateController = require('../controllers/UpdateController');
const { redisClientService } = require('../database/redis/init');
const theRedis = redisClientService();

const indexController = new CartIndexController(theRedis);
const updateController = new CartUpdateController(theRedis);

router.get('/', [checkSession], asyncHandler((req, res) => indexController.index(req, res)));
router.put('/', [checkSession], asyncHandler((req, res) => updateController.index(req, res)));
router.put('/modifier', [checkSession], asyncHandler((req, res) => updateController.updateCart(req, res)));
router.delete('/clearCart', [checkSession], asyncHandler((req, res) => updateController.clearCart(req, res)));

module.exports = router;
