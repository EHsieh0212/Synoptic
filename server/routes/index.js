const express = require("express");
const productRouter = require("./productRouter");
const userRouter = require("./userRouter");
const cartRouter = require("./cartRouter");
const router = express.Router();
const fs = require('fs');
// fs.readdirSync(__dirname).forEach(function (route) {
//     route = route.split('.')[0];
//     if (route === 'index') {
//         return;
//     }
//     router.use(`/${route}`, require(`./${route}`)(app));
// });

router.use("/products", productRouter);
router.use("/users", userRouter);
router.use("/cart", cartRouter);

module.exports = router;