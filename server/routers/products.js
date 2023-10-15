const { Router } = require('express');
const router = Router();
const product = require('../services/products');
const asyncHandler = require('../utils/asyncHandler');



// Product Search API

router.get("/search",
    asyncHandler(async (req, res) => {
        const result = await product.getProductsByKeyword(req.query.keyword);
        if (result) {
            res.json(result);
        } else {
            const err = new Error("Resource not found");
            err.status = 404;
            throw err;
        }
    }));









// Product List API: p.product_name, p.product_price, p.product_img, product_colors
// return: 
router.get('/:category', async (req, res) => {
    try {
        const { category } = req.params;
        let categoryId = 0;
        switch (category) {
            case 'women':
                categoryId = 1;
                break;
            case 'men':
                categoryId = 2;
                break;
            case 'accessories':
                categoryId = 3;
                break;
        }
        // totalLength: based on category
        let totalResult;
        if (categoryId != 0) {
            totalResult = await dbSqlCommand(`SELECT count(*) as c
                                        FROM product
                                        WHERE category_id = ?`, [categoryId]);
        } else {
            totalResult = await dbSqlCommand(`SELECT count(*) as c
                                        FROM product`);
        }
        const totalResultLength = totalResult[0][0].c;
        if (totalResultLength == 0) {
            return res.status(404).json({ msg: `Product Table category ${category} Has No Entries.` });
        }

        // pagination setting
        const paging = parseInt(req.query.paging);
        const startIndex = paging * 6;
        const endIndex = (paging + 1) * 6;

        // quering
        let query;
        if (categoryId != 0) {
            const selectCategory =
                `
            SELECT p.product_id, p.product_name, p.product_price, p.product_img, 
            (
                SELECT JSON_ARRAYAGG(pc.product_color)
                FROM product_inventory as pc
                WHERE p.product_id = pc.product_id
            ) as product_colors
            FROM product as p
            WHERE p.category_id = ?
            LIMIT 6 OFFSET ?;
            `;
            query = await dbSqlCommand(selectCategory, [categoryId, startIndex]);
        } else {
            const selectAll =
                `
            SELECT p.product_id, p.product_name, p.product_price, p.product_img, 
            (
                SELECT JSON_ARRAYAGG(pc.product_color)
                FROM product_inventory as pc
                WHERE p.product_id = pc.product_id
            ) as product_colors
            FROM product as p
            LIMIT 6 OFFSET ?;
            `;
            query = await dbSqlCommand(selectAll, [startIndex]);
        }
        // check if query result is not empty
        if (query[0].length == 0) {
            return res.status(404).json({ msg: "No query found." });
        }
        // result consisted of 3 parts: (1)previous_paging (2)next_paging (3)query_result
        const results = {};
        // (1)
        if (startIndex > 0) {
            results.previous_paging = paging - 1;
        } else {
            results.previous_paging = NaN;
        }
        // (2)
        if (endIndex <= totalResultLength) {
            results.next_paging = paging + 1;
        } else {
            results.next_paging = NaN;
        }
        // (3)
        results.results = query[0];
        return res.json(results);
    } catch (error) {
        return res.status(404).send({
            msg: error.message
        });
    }
});


///////////////////////////////////////////////////////////////////////////////////////////////
// to-be fixed
// Product Details API
router.get('/:pid/details', async (req, res) => {
    try {
        const pid = parseInt(req.params.pid);
        let productDetail = `SELECT p.product_origin, p.product_textDescription, pc.product_quantity, p.product_img, pc.product_color, pc.product_size
                    FROM product as p, product_inventory as pc
                    WHERE p.product_id = pc.product_id AND p.product_id = ?`;
        const query = await dbSqlCommand(productDetail, [pid]);
        if (query[0].length != 0) {
            return res.json(query[0]);
        } else {
            res.status(404).json({ msg: "No query." });
        }
    } catch (error) {
        return res.status(400).send({
            msg: error.message
        });
    }
});





module.exports = router;

