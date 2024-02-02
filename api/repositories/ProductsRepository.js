const { once, get } = require('lodash');
const { Op } = require('sequelize');
const { GenericRepository } = require('./base/GenericRepository');
const { Products } = require('../database/mysql/models/Products');
const { CATEGORIES } = require('./constants/Products.constants');

class ProductsRepository extends GenericRepository {
    async findIdsByKeyword(keyword) {
        if (keyword === undefined || keyword === "") {
            throw new Error("Invalid keyword");
        }
        const query = { title: { [Op.like]: `%${keyword}%` } };
        const attributes = ['id'];
        const result = await this.findAllWithColumns(attributes, query).then(result => result.map(obj => get(obj, 'id')));
        if (result === undefined || result === ""){
            throw new Error("Null Result in Product Repository");
        }
        return result;
    }

    async findIdsByPage(pageNum, offset, limit, order = [['createdAt', 'DESC']]) {
        if (typeof pageNum !== "number" || isNaN(pageNum) || pageNum < 0) {
            throw new Error("Invalid page number");
        }
        const attributes = ['id'];
        const { count, rows } = await this.findAndCountAll(attributes, offset, limit, order);
        if (rows === undefined || rows === ""){
            throw new Error("Null Result in Product Repository");
        }
        return { count, rows };
    }

    async findIdsByCategoryAndPage(category, pageNum, offset, limit, order = [['createdAt', 'DESC']]) {
        if (typeof pageNum !== "number" || isNaN(pageNum) || pageNum < 0) {
            throw new Error("Invalid page number");
        }
        if (CATEGORIES.indexOf(category) === -1) {
            throw new Error("Invalid category");
        }
        const query = { category };
        const attributes = ['id'];
        const { count, rows } = await this.findAndCount(query, attributes, offset, limit, order);
        
        const ids = rows.map(obj => obj.id);

        if (rows === undefined || rows === ""){
            throw new Error("Null Result in Product Repository");
        }
        return { count, ids };
    }

    async findProductById(id) {
        if (id === undefined || id === "") {
            throw new Error("Invalid Product Id");
        }
        const query = { id };
        const result = await this.findOne(query);
        if (result === undefined || result === ""){
            throw new Error("Null Result in Product Repository");
        }
        return result;
    }

    async findProductsByIds(ids) {
        if (ids === undefined || ids === "") {
            throw new Error("Invalid Product Ids");
        }
        const query = { id: { [Op.in]: ids } };
        const result = await this.findAll(query);
        if (result === undefined || result === ""){
            throw new Error("Null Result in Product Repository");
        }
        return result;
    }
}

module.exports = once(() => new ProductsRepository(Products));