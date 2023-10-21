const { Router } = require('express');
const router = Router();
const {dbSqlCommand} = require('../db/database');
const uploadImage = require('../utils/fileUpload');
const {v4: uuidv4} = require('uuid');

// insert into product & product_inventory table
router.post('/upload', uploadImage, async(req, res) => {
    // 1. req.body: product basics & details
    // 2. req.body.details: product inventory infos
    try{
        let pId = uuidv4();
        let {product_name, product_category, product_price, product_textDescription, product_origin} = req.body;
        let product_image = './public/img/product_images/' + req.file.filename;  // dir same level with app.js
        let details = JSON.parse(req.body.details);    // details taken from innerHtml, so it would be a string wraps an array of objects
        // (1) insert to product table 7 columns
        let insertProduct = `INSERT INTO product(product_id, category_id, product_name, product_price, product_img, product_origin, product_textDescription) 
                             VALUES (?, ?, ?, ?, ?, ?, ?);`
        let insertProductTarget = [pId, Number(product_category), product_name, Number(product_price), product_image, product_origin, product_textDescription];
        const insertProductQuery = await dbSqlCommand(insertProduct, insertProductTarget);
        // (2) insert to product_inventory table 4 columns
        for (let i = 0; i <= details.length - 1; i++){
            let oneEntry = details[i];
            let {product_quantity, product_color, product_size} = oneEntry;
            let insertProductInven = `INSERT INTO product_inventory(product_id, product_color, product_size, product_quantity) 
                                      VALUES (?, ?, ?, ?);`
            let insertProductInvenTarget = [pId, product_color, product_size, Number(product_quantity)];
            await dbSqlCommand(insertProductInven, insertProductInvenTarget);
            if ((i+1) == details.length){
                break;
            }
        }
        res.send("Successfully created a product with entries.");
    } catch(error){
        return res.status(400).send({
            msg: error.message
        });
    }
})

module.exports = router;