const express = require("express");
const productRouter = require("./productRouter");
const userRouter = require("./userRouter");
const cartRouter = require("./cartRouter")
const orderRouter = require("./orderRouter");
const router = express.Router();

router.use("/products", productRouter);
router.use("/cart", cartRouter);
router.use("/users", userRouter);
router.use("/orders", orderRouter);

module.exports = router;