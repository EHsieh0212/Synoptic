const productsRepository = require('../repositories/ProductsRepository');
const variantsRepository = require('../repositories/VariantsRepository');
const { PAGE_SIZE } = require('../repositories/constants/Products.constants');
const { redisClient } = require('../database/redis/init');

/**
 * Get all product complete information by keyword
 * @param {string} keyword
 * @returns {Object}
 */
const getProductsByKeyword = async (keyword) => {
    const productsRepositoryInstance = productsRepository();
    const variantsRepositoryInstance = variantsRepository();
    const productIds = await productsRepositoryInstance.findIdsByKeyword(keyword);
    const mainProducts = await productsRepositoryInstance.findProductsByIds(productIds);
    const mainProductsVariants = await variantsRepositoryInstance.findVariantsByProductIds(productIds);
    const productsWithVariants = await _combineProductWithVariant(mainProducts, mainProductsVariants);

    return {
        data: productsWithVariants,
        dataCount: productsWithVariants.length,
    };
};

/**
 * Get all product complete information by category and page number
 * @param {string} category 
 * @param {number} pageNum 
 * @returns {Object}
 */
const getProductsByCategory = async (category, pageNum = 0) => {
    const offset = pageNum * PAGE_SIZE;
    const productsRepositoryInstance = productsRepository();
    const variantsRepositoryInstance = variantsRepository();
    const { count, ids } = await productsRepositoryInstance.findIdsByCategoryAndPage(category, pageNum, offset, PAGE_SIZE);
    const mainProducts = await productsRepositoryInstance.findProductsByIds(ids);
    const mainProductsVariants = await variantsRepositoryInstance.findVariantsByProductIds(ids);
    const result = await _combineProductWithVariant(mainProducts, mainProductsVariants);

    const returnObject = {
        data: result,
        dataCount: result.length,
    };

    if (count === PAGE_SIZE) {
        returnObject.nextPaging = pageNum + 1;
    }
    return returnObject;
};

/**
 * Get one product complete information by product id
 * @param {string} id 
 * @returns {Object}
 */
const getProductDetailById = async (id) => {
    const productsRepositoryInstance = productsRepository();
    const variantsRepositoryInstance = variantsRepository();
    const mainProduct = await productsRepositoryInstance.findProductById(id);
    const mainProductVariant = await variantsRepositoryInstance.findVariantsByProductIds([id]);
    const productsWithVariants = Object.assign(mainProduct, { stock: mainProductVariant });

    return {
        data: [productsWithVariants],
        dataCount: 1
    };
};

/**
 * Inner function to combine main product info with product variant info
 * @param {Object} productArray 
 * @param {Object} variantArray 
 * @returns {Object}
 */
const _combineProductWithVariant = (productArray, variantArray) => {
    const productsWithVariants = productArray.map((product) => {
        const result = variantArray.filter((v) => v.productId === product.id);
        const variant = result ? result : null;
        return Object.assign({}, product, { stock: variant });
    });
    return productsWithVariants;
};

const storeCartInfo = async (customerId, cart) => {
    const { quantity } = cart;
    const cartKey = `customer:${customerId}:cart`;
    await redisClient.connect();
    await redisClient.hSet(cartKey, 'quantity', quantity, (err) => {
        if (err) {
            console.log(err);
            return { status: "fail"};
        } else {
            console.log(`Cart information saved for customer ${customerId}`);
            return { status: "success"};
        }
    });
};


module.exports = {
    getProductsByKeyword,
    getProductsByCategory,
    getProductDetailById,
    storeCartInfo
};