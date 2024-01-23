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

    async checkoutWithTransaction({ guestUserId, email, postalCode, firstName, lastName, address, addressDetails, phone, amount, cartDetails, prime, paymentDetails }) {
        try {
            await dbClient.transaction(async (t) => {
                // 1. create 1 order row
                const orderQuery = {
                    userId: guestUserId,
                    email,
                    postalCode,
                    recipientFirstName: firstName,
                    recipientLastName: lastName,
                    address,
                    addressAdditional: addressDetails,
                    phone,
                    amount,
                };
                const createdOrder = await this.insertOne(orderQuery);
                // 2. create multiple orderd_item rows
                console.log('-------------')
                console.log(createdOrder)
                const orderId = createdOrder.dataValues.id;
                const itemCount = cartDetails.length;
                console.log(`----------This order has ${itemCount} items----------`)
                const orderedItemsRepositoryInstance = orderedItemsRepository();
                const orderedItemIds = await orderedItemsRepositoryInstance.createOrderItems(orderId, cartDetails);
                //     // 4. 
                //     const { amount, recipient, email, phone } = orderInfo;
                //     const payment = await tapPayAction(prime, amount, recipient, email, phone, createdOrderId, details);
                //     // 5. 
                //     const updateTargets = { paid: 1, payment: payment.toJSON() };
                //     await this.update(updateTargets, { id: createdOrderId }, transaction);
                console.log('------success-------')
                console.log(typeof orderedItemIds)
                console.log(orderedItemIds)
            })
            return { status: 1 };
        } catch (error) {
            console.log(error)
        }
    }



};

module.exports = once(() => new OrdersRepository(Orders));
