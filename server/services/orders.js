// const ordersRepository = require('../repositories/OrdersRepository');
const ordersRepository = require('../repositories/fix');
const userRepository = require('../repositories/UsersRepository');
const { v4: uuidv4 } = require('uuid');

// service does: 
// (1) if user==guest: create random userId -> create a user row!
// (2) passes deliveryInfo + orderInfo to repository

// db updates data
// From OrderRepository, but involves 3 tables
// (1) Order Table
// (2) Orderd Item Table
// (3) Product Table stock info
const checkout = async ({ email, postalCode, firstName, lastName, address, addressDetails, phone, amount, cartDetails, prime, paymentDetails }) => {
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
    const ordersReposityInstance = ordersRepository();
    const allInfo = { guestUserId, email, postalCode, firstName, lastName, address, addressDetails, phone, amount, cartDetails, prime, paymentDetails };
    const checkoutResult = await ordersReposityInstance.checkoutWithTransaction(allInfo);
    console.log('------------order router------------')
    console.log(checkoutResult)
    return checkoutResult;
};

module.exports = {
    checkout,
}
