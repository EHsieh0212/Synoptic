const ordersRepository = require('../repositories/OrdersRepository');

const checkout = async ({userId, amount, recipient, email, phone, address, deliveryTime, details, prime}) => {
    const ordersReposityInstance = ordersRepository();
    const orderInfo = { userId, amount, recipient, email, phone, address, deliveryTime };
    const checkoutResult = await ordersReposityInstance.checkoutWithTransaction(orderInfo, details, prime);
    return checkoutResult;
};

module.exports = {
    checkout,
}
