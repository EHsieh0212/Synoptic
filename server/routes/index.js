const express = require("express");
const productRouter = require("./productRouter");
const userRouter = require("./userRouter");
const cartRouter = require("./cartRouter");
const router = express.Router();

router.use("/products", productRouter);
router.use("/users", userRouter);
router.use("/cart", cartRouter);

module.exports = router;