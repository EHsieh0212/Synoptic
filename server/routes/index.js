const express = require("express");
const productRouter = require("./productRouter");
const userRouter = require("./userRouter");
const orderRouter = require("./orderRouter");
const router = express.Router();

router.use("/products", productRouter);
router.use("/users", userRouter);
router.use("/orders", orderRouter);

module.exports = router;