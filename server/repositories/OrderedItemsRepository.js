const { Op } = require('sequelize');
const { GenericRepository } = require('./base/GenericRepository');
const { OrderedItems } = require('../database/mysql/models/OrderedItems');
const { once, get } = require('lodash');

class OrderedItemsRepository extends GenericRepository {
    async createOrderItems(orderId, variantIds, numbers, transaction) {
        const query = variantIds.map((variantId, i) => ({ orderId, variantId: variantId.id, number: numbers[i] }));
        return await this.insertMany(query, transaction);
    }

}

module.exports = once(() => new OrderedItemsRepository(OrderedItems));
