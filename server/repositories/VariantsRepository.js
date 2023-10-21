const { once } = require('lodash');
const { Op } = require('sequelize');
const { GenericRepository } = require('./base/GenericRepository');
const { Variants } = require('../database/mysql/models/Variants');

class VariantsRepository extends GenericRepository {
    async findVariantByProductId(id) {
        if (id === undefined || id === "") {
            throw new Error("Invalid Variant Id");
        }
        const query = { productId: id };
        const result = await this.findOne(query);
        if (result === undefined || result === ""){
            throw new Error("Null Result in Variant Repository")
        }
        return result;
    }

    async findVariantsByProductIds(ids) {
        if (ids === undefined || ids === "") {
            throw new Error("Invalid Variant Ids");
        }
        const query = { productId: { [Op.in]: ids } };
        const result = await this.findAll(query);
        if (result === undefined || result === ""){
            throw new Error("Null Result in Variant Repository")
        }
        return result;
    }
};

module.exports = once(() => new VariantsRepository(Variants));

