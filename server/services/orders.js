const ordersRepository = require('../repositories/OrdersRepository');
const userRepository = require('../repositories/UsersRepository');
const { v4: uuidv4 } = require('uuid');

// service does: 
// (1) if user==guest: create random userId -> create a user row
// (2) passes deliveryInfo + orderInfo to repository

// db updates data
// From OrderRepository, but involves 3 tables
// (1) Order Table
// (2) Orderd Item Table
// (3) Product Table stock info
const checkout = async ({ email, postalCode, firstName, lastName, address, addressDetails, phone, amount, cartDetails, prime }) => {
    const userRepositoryInstance = userRepository();
    // check user existence
    let guestUserId;
    const ifGuestExists = await userRepositoryInstance.checkExistence({email})
    if (ifGuestExists !== 1){
        guestUserId = uuidv4();
        await userRepositoryInstance.registerGuestUser(guestUserId, email, phone, address);
    } else{
        const result = await userRepositoryInstance.findGuestUserIdByEmail(email);
        guestUserId = result[0].id;
    }
    // db transaction
    let thePrime;
    thePrime = process.env.APP_ENV === 'test' ? process.env.TP_TEST_PRIME : prime;
    const ordersReposityInstance = ordersRepository();
    const allInfo = { guestUserId, email, postalCode, firstName, lastName, address, addressDetails, phone, amount, cartDetails, thePrime };
    const checkoutResult = await ordersReposityInstance.checkoutWithTransaction(allInfo);
    return checkoutResult;
};

module.exports = {
    checkout,
}
