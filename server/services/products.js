const { dbSqlCommand, dbTransaction } = require('../db/database');
const CATEGORIES = ["all", "men", "women"];

/**
 * Get products by keyword
 * @param {string} keyword
 */
const getProductsByKeyword = async (keyword) => {
    if (keyword === undefined || keyword === "") {
        throw new Error("Invalid keyword");
    }

    const searchQuery = `SELECT id FROM products WHERE title LIKE ?`;
    const searchParam = [`%${keyword}%`];
    const searchIds = await dbSqlCommand(searchQuery, searchParam).then(result => result[0].map(obj => obj.id));

    return {
        data: await _getAllInformationByIds(searchIds),
        resultCount: searchIds.length
    }
};

/**
 * Gets products of all category by page number
 * @param {number} pageNum
 */
const getProductsByPage = async(pageNum) => {
    if (typeof pageNum !== "number" || isNaN(pageNum) || pageNum < 0) {
        throw new Error("Invalid page number");
    }
};







/**
 * Internal function to get the complete product informations by given ids
*/
const _getAllInformationByIds = async(ids) => {
    if (ids.length === 0) {
        return [];
    }

    const idQuery = 
    'SELECT id, category, title, price, img_src, description, more '+
    'FROM products WHERE id IN ' +
    `(${Array(ids.length).fill("?").join(", ")})`;
    const productObjectArray = await dbSqlCommand(idQuery, ids).then(result => result[0]);

    const stockQuery = `SELECT size, color, number FROM variants WHERE product_id = ?`;
    for (const [idx, product] of productObjectArray.entries()) {
        product.stock = await dbSqlCommand(stockQuery, product.id).then(result => result[0]);
    };

    return productObjectArray;
};


module.exports = {
    getProductsByKeyword
}