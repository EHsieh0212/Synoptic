const { once } = require('lodash');
const { GenericRepository } = require('./base/GenericRepository');
const { Prices } = require('../database/mysql/models/Prices');
const { Sequelize } = require('sequelize');

class PricesRepository extends GenericRepository {
    async updatePriceByOneDollar(){
        const updatedFields = {
            price: Sequelize.literal('price + 1'),
            updatedAt: Sequelize.fn('NOW')
        }
        return await this.update(updatedFields, {});
    }
}

module.exports = once(() => new PricesRepository(Prices));