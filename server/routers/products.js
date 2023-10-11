const { Router } = require('express');
const router = Router();
const { dbSqlCommand } = require('../db/database');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');

// Product Search API: p.product_name, p.product_price, p.product_img, product_colors
// return: results{}
router.get('/search', async (req, res) => {
    try {
        const keyword = req.query.keyword;
        const selectProduct =
            `
        SELECT p.product_id, p.product_name, p.product_price, p.product_img, 
        (
            SELECT JSON_ARRAYAGG(pc.product_color)
            FROM product_inventory as pc
            WHERE p.product_id = pc.product_id
        ) as product_colors
        FROM product as p
        WHERE p.product_name LIKE ?;
        `;
        const query = await dbSqlCommand(selectProduct, [`%${keyword}%`]);
        if (query[0].length != 0) {
            const result = {};
            result.results = query[0];
            res.json(result);
        } else {
            res.status(404).json({ msg: "No query." });
        }
    } catch (error) {
        return res.status(400).send({
            msg: error.message
        });
    }
});


////////////////////////////////////////////////////
// 1.read john's api 2.store in stylish3 database
router.get('/storeData', async (req, res) => {
    const resultFromApi = await axios.get('http://35.75.145.100:1234/api/1.0/order/data');
    const data = resultFromApi.data;
    try {
        for (let i in data) {
            // 1. insert into "orderNew"
            const insertOrderScript = `INSERT INTO ${process.env.DB}.orderNew(o_id, o_total) 
                                       VALUES(?,?)`;
            const orderId = uuidv4();
            const orderTotal = data[i].total;
            const insertOrderQuery = await dbSqlCommand(insertOrderScript, [orderId, orderTotal]);
            // 2. insert into "orderDetailNew"
            const orderDetail = data[i].list;
            for (let j in orderDetail) {
                const insertProductScript = `INSERT INTO ${process.env.DB}.orderDetailNew(o_id, o_total, p_id, p_size, p_qty, p_price, p_color_code, p_color_name)
                                             VALUES(?,?,?,?,?,?,?,?)`;
                const id = orderDetail[j].id;
                const size = orderDetail[j].size;
                const qty = orderDetail[j].qty;
                const price = orderDetail[j].price;
                const colorCode = orderDetail[j].color.code;
                const colorName = orderDetail[j].color.name;
                const insertProductQuery = await dbSqlCommand(insertProductScript, [orderId, orderTotal, id, size, qty, price, colorCode, colorName]);
            }
        }
        return res.status(200).send({ msg: "insert successfully." })
    } catch (error) {
        return res.status(400).send({
            msg: error.message
        });
    }
})


// get total revenue from orderNew
router.get('/getTotalRevenue', async (req, res) => {
    try {
        const countRvScript = `select sum(o_total) as totalRevenue from ${process.env.DB}.orderNew;`;
        const result = await dbSqlCommand(countRvScript);
        return res.json(result[0][0]);

    } catch (error) {
        return res.status(404).send({
            msg: error.message
        });
    }
})


// get color-qty 
router.get('/getColorQty', async (req, res) => {
    try {
        const countRvScript = `select p_color_name as p_name, count(p_qty) as p_count from ${process.env.DB}.orderDetailNew group by p_color_name;`;
        const result = await dbSqlCommand(countRvScript);
        return res.json(result[0]);

    } catch (error) {
        return res.status(404).send({
            msg: error.message
        });
    }
})


router.get('/getPriceQty', async (req, res) => {
    try {
        const countRvScript = `select p_price from ${process.env.DB}.orderDetailNew order by p_price;`;
        const result = await dbSqlCommand(countRvScript);
        return res.json(result[0]);

    } catch (error) {
        return res.status(404).send({
            msg: error.message
        });
    }
})


router.get('/getTop5ProductsAndSize', async (req, res) => {
    try {
        // 1.top 5
        const countRvScript = `select p_id, count(p_qty) as count from ${process.env.DB}.orderDetailNew group by p_id order by count desc limit 5;`;
        const result = await dbSqlCommand(countRvScript);
        const top5Product = result[0];

        // 2. size of top5 
        const top5s = top5Product.map(e => e.p_id);
        const sizes = ['S', 'M', 'L'];
        const sizesInfo = [top5s];
        const tmp = [];

        for (let i in sizes) {
            const getProductsofSize = `select p_id, count(p_qty) as count from stylish3.orderDetailNew where p_id = ? or p_id = ? or p_id = ? or p_id = ? or p_id = ? and p_size = ? group by p_id order by p_id;`;
            let inf = Object.keys(top5s).map((key) => top5s[key]);
            inf.push(sizes[i])
            const result2 = await dbSqlCommand(getProductsofSize, inf);
            let obj = {}
            obj[sizes[i]] = result2[0]
            tmp.push(obj);
        }
        sizesInfo.push(tmp);
        return res.json(sizesInfo);

    } catch (error) {
        return res.status(404).send({
            msg: error.message
        });
    }
})


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

