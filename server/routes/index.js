const express = require('express');
const productRouter = require('./productRouter');
const userRouter = require('./userRouter');
const cartRouter = require('./cartRouter');
const orderRouter = require('./orderRouter');
const chatbotRouter = require('./chatbotRouter');
const priceRouter = require('./priceRouter');
const router = express.Router();

router.use('/products', productRouter);
router.use('/cart', cartRouter);
router.use('/users', userRouter);
router.use('/orders', orderRouter);
router.use('/chatbot', chatbotRouter);
router.use('/prices', priceRouter);

module.exports = router;
