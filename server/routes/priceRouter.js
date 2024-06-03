const { Router } = require('express');
const router = Router();
const prices = require('../services/prices');
const { asyncHandler } = require('../utils/asyncHandler');

router.post('/increasePriceToFightInflation', asyncHandler(async (req, res) => {
    const result = await prices.increasePriceToFightInflation();
    if (result) {
        res.json(result);
    } else {
        const errMsg = 'Router Level Error: Resource not found (Return Empty)';
        const err = Object.assign(new Error(errMsg), {
            status: 404,
            msg: errMsg,
            content: result,
        });
        console.log(result);
        throw err;
    }
})
);

module.exports = router;