const { Router } = require('express');
const router = Router();
const { asyncHandler } = require('../utils/asyncHandler');
const checkSession = require('../utils/checkSession');
const CartIndexController = require('../controllers/IndexController');
const CartUpdateController = require('../controllers/UpdateController');
const CartDeleteItemController = require('../controllers/DeleteItemController');
const { redisClientService } = require('../database/redis/init');
const theRedis = redisClientService();

const indexController = new CartIndexController(theRedis);
const updateController = new CartUpdateController(theRedis);
const deleteItemController = new CartDeleteItemController(theRedis);

router.get('/', [checkSession], asyncHandler((req, res) => indexController.index(req, res)))
router.put('/', [checkSession], asyncHandler((req, res) => updateController.index(req, res)));
router.delete('/', [checkSession], asyncHandler((req, res) => deleteItemController.index(req, res)));


module.exports = router;
