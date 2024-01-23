const { Op } = require('sequelize');
const { once } = require('lodash');
const { dbClient } = require('../database/mysql/init');
const { GenericRepository } = require('./base/GenericRepository');
const { Orders } = require('../database/mysql/models/Orders');
const { tapPayAction } = require('../utils/payment');
const orderedItemsRepository = require('./OrderedItemsRepository');
const variantsRepository = require('./VariantsRepository');

class OrdersRepository extends GenericRepository {
    async createOrder(orderInfo) {
        return this.insertWithTransaction(orderInfo);
    }

    async updateSuccessPayment(orderId, successPaymentDetail){
        return await this.update(successPaymentDetail, {id: orderId});
    }

    async checkoutWithTransaction({ guestUserId, email, postalCode, firstName, lastName, address, addressDetails, phone, amount, cartDetails, thePrime }) {
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
                const orderId = createdOrder.dataValues.id;
                const itemCount = cartDetails.length;
                const orderedItemsRepositoryInstance = orderedItemsRepository();
                await orderedItemsRepositoryInstance.createOrderItems(orderId, cartDetails);
                // 3. tappay payment 
                const paymentDetails = await tapPayAction(thePrime, amount, firstName, lastName, email, phone, orderId, cartDetails);
                // 4. update1: paid&payment to Order table / update2: according to cartItems deduct product stock
                if (paymentDetails.status !== 0){
                    return new Error("tappay failed");
                }
                const successPaymentDetail = { paid: 1, payment: paymentDetails };
                await this.updateSuccessPayment(orderId, successPaymentDetail);
                const variantsRepositoryInstance = variantsRepository();
                await variantsRepositoryInstance.updateMultipleVariantStocks(cartDetails);
            })
            return { status: 1 };
        } catch (error) {
            console.log(error)
        }
    }



};

module.exports = once(() => new OrdersRepository(Orders));
