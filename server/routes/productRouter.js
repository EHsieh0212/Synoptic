const { Router } = require('express');
const router = Router();
const products = require('../services/products');
const { asyncHandler } = require('../utils/asyncHandler');

router.get("/search/:search",
    asyncHandler(async (req, res) => {
        console.log(req.params)
        const result = await products.getProductsByKeyword(req.params.search);
        if (result.dataCount) {
            res.json(result);
        } else {
            const errMsg = "Router Level Error: Resource not found (Return Empty)";
            const err = Object.assign(new Error(errMsg), { status: 404, msg: errMsg, content: result });
            console.log(result);
            throw err;
        }
    }));


router.get("/details",
    asyncHandler(async (req, res) => {
        const result = await products.getProductDetailById(req.query.id);
        if (result) {
            console.log(result.data[0])
            res.json(result);
            
        } else {
            const errMsg = "Router Level Error: Resource not found (Return Empty)";
            const err = Object.assign(new Error(errMsg), { status: 404, msg: errMsg, content: result });
            console.log(result);
            throw err;
        }
    }));

router.get("/:category",
    asyncHandler(async (req, res) => {
        const category = req.params.category;
        const result = await products.getProductsByCategory(category, parseInt(req.query.paging));

        if (result) {
            res.status(200).json(result);
        } else {
            const errMsg = "Router Level Error: Resource not found (Return Empty)";
            const err = Object.assign(new Error(errMsg), { status: 404, msg: errMsg, content: result });
            console.log(result);
            throw err;
        }
    }));

module.exports = router;
