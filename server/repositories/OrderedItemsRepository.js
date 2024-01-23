const { Op } = require('sequelize');
const { GenericRepository } = require('./base/GenericRepository');
const { OrderedItems } = require('../database/mysql/models/OrderedItems');
const { once, get } = require('lodash');

class OrderedItemsRepository extends GenericRepository {
    async createOrderItems(orderId, cartDetails) {
        const query = cartDetails.map((item) => ({ orderId, variantId: item.variantId, number: item.quantity }));
        return await this.insertMany(query);
    }

}

module.exports = once(() => new OrderedItemsRepository(OrderedItems));
