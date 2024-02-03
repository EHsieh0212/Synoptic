const { Router } = require('express');
const router = Router();
// const { authenticator } = require('../utils/userAuthentication');
const { asyncHandler } = require('../utils/asyncHandler');
const orders = require('../services/orders');

router.post('/checkout', asyncHandler(async (req, res) => {
    // const userId = req.user.id;
    const inputString = Object.assign(req.body);
    const result = await orders.checkout(inputString);
    
    if (result){
        res.json(`There are rows of order being updated`);
    } else {
        const errMsg = "Router Level Error: Resource not found (Return Empty)";
        const err = Object.assign(new Error(errMsg), { status: 404, msg: errMsg, content: result });
        console.log(result);
        throw err;
    }
}));

module.exports = router;