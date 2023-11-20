const { Router } = require('express');
const router = Router();
const { authenticator } = require('../utils/userAuthentication');
const { asyncHandler } = require('../utils/asyncHandler');
const orders = require('../services/orders');

router.post('/checkout', authenticator('jwt'), asyncHandler(async (req, res) => {
    console.log('------------')
    const userId = req.user.id;
    const inputString = Object.assign(req.body, {userId})
    const result = await orders.checkout(inputString);
    
    if (result){
        res.send(`There are ${result} rows of order being updated`).end();
    } else {
        const errMsg = "Router Level Error: Resource not found (Return Empty)";
        const err = Object.assign(new Error(errMsg), { status: 404, msg: errMsg, content: result });
        console.log(result);
        throw err;
    }

    // if (paymentDetails && (paymentStatus == 0) ){
    //     req.payments = paymentDetails;
    //     console.log("onin")
    //     // insert into order table by transaction
    //     let insertOrder = `INSERT INTO orders(order_id, orderer_name, orderer_phone, orderer_address, orderer_email, orderer_prime, is_paid, user_id, order_deliverTime) 
    //                        VALUES(?,?,?,?,?,?,?,?,?)`;
    //     let insertOrderTarget = [orderId, receiver, phoneNum, address, email, prime, Number(0), userId, delivertime];
    //     let updatePaidStatus = `UPDATE orders SET is_paid = ? WHERE user_id = ?`;
    //     let updatePaidStatusTarget = [1, userId];
    //     let action = [[insertOrder, insertOrderTarget], [updatePaidStatus, updatePaidStatusTarget]];
    //     await dbTransaction(action);    
    //     return res.send({paymentStatus});
    // }
}));

module.exports = router;