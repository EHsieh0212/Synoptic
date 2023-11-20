const { Op } = require('sequelize');
const { once } = require('lodash');
const { dbClient } = require('../database/mysql/init');
const { GenericRepository } = require('./base/GenericRepository');
const { Orders } = require('../database/mysql/models/Orders');
const { tapPayAction } = require('../utils/payment');
const variantsRepository = require('./VariantsRepository');
const orderedItemsRepository = require('./OrderedItemsRepository');


class OrdersRepository extends GenericRepository {
    async createOrder(orderInfo) {
        return this.insertWithTransaction(orderInfo);
    }

    // transaction should be set up here, including the whole process: 1) create order. 2) search variant id. 3) create orderItem. 4) tappay. 5) set paid to True.
    // scenario: if tappay failed, rollback order creation / order item creation. only "creation" requires rollback if one failed.
    async checkoutWithTransaction(orderInfo, details, prime) {
        const transaction = await dbClient.transaction();
        try {
            // 1.
            const createdOrderId = await this.insertOne(orderInfo, transaction);
            // 2.
            const variantsRepositoryInstance = variantsRepository();
            const itemCount = details.length;
            const [variantIds, numbers] = await variantsRepositoryInstance.findVariantsByConditions(details);
            if (itemCount !== variantIds.length) {
                throw new Error("Not all variants are valid.");
            }
            // 3. 
            // const orderedItemsRepositoryInstance = orderedItemsRepository();
            // const orderedItemIds = await orderedItemsRepositoryInstance.createOrderItems(createdOrderId.toJSON().id, variantIds, numbers, transaction);

            // 4. 
            const { amount, recipient, email, phone } = orderInfo; 
            const payment = await tapPayAction(prime, amount, recipient, email, phone, createdOrderId, details);

            // 5. 
            // const updateTargets = { paid: 1, payment: payment.toJSON() };
            // console.log('-----------')
            // const result = await this.update(updateTargets, {id: createdOrderId}, transaction);
            // console.log('===========')
            // console.log(result)
            await transaction.commit();

            // question: 
                // when 3.: transaction timeout, failed
                // when 5.: cannot post /api/v1/orders/checkout, failed. ?
            
            return 1;
        } catch (error) {
            // if we got an error and we created the transaction, roll it back
            await transaction.rollback();
            console.error('Error inserting entities:', error.original);
            throw error.original;
        }
    }
};

module.exports = once(() => new OrdersRepository(Orders));
