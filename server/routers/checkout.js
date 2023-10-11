// Build Check Out Page
const {Router} = require('express');
const router = Router();
const dbSqlCommand = require('../db/database').dbSqlCommand;
const dbTransaction = require('../db/database').dbTransaction;
const {IsLoggedIn} = require('../middleware/validate');
const {tapPayAction} = require('../utils/payment');
const {v4: uuidv4} = require('uuid');
const axios = require('axios');


router.post('/checkout', IsLoggedIn, async(req, res) => {
    // required infos
    const userId = req.jwtEncodedInfo.id;
    const {receiver, phoneNum, address, email, delivertime, prime} = req.body;
    const orderId = uuidv4();
    // payment
    try{
        // const result = await tapPayAction(prime);  // why this function has no return?
        try{
            const post_data = {
                "prime": prime,
                "partner_key": "partner_6ID1DoDlaPrfHw6HBZsULfTYtDmWs0q0ZZGKMBpp4YICWBxgK97eK3RM",
                "merchant_id": "GlobalTesting_CTBC",
                "amount": 1,
                "currency": "TWD",
                "details": "An apple and a pen.",
                "cardholder": {
                    "phone_number": "+886923456789",
                    "name": "jack",
                    "email": "example@gmail.com"
                },
                "remember": false
            }
            await axios.post('https://sandbox.tappaysdk.com/tpc/payment/pay-by-prime', post_data, {
                headers: {
                    'x-api-key': 'partner_6ID1DoDlaPrfHw6HBZsULfTYtDmWs0q0ZZGKMBpp4YICWBxgK97eK3RM'
                }
            })
            .then(async(response) => {
                try{
                    const paymentDetails = response.data;
                    const paymentStatus = response.data.status;
                    result = {paymentDetails, paymentStatus};
                } catch(error){
                    throw error;
                }
            })
        } catch(error){
            throw error;
        }

        const paymentDetails = result.paymentDetails;
        const paymentStatus = result.paymentStatus;

        if (paymentDetails && (paymentStatus == 0) ){
            req.payments = paymentDetails;
            console.log("onin")
            // insert into order table by transaction
            let insertOrder = `INSERT INTO orders(order_id, orderer_name, orderer_phone, orderer_address, orderer_email, orderer_prime, is_paid, user_id, order_deliverTime) 
                               VALUES(?,?,?,?,?,?,?,?,?)`;
            let insertOrderTarget = [orderId, receiver, phoneNum, address, email, prime, Number(0), userId, delivertime];
            let updatePaidStatus = `UPDATE orders SET is_paid = ? WHERE user_id = ?`;
            let updatePaidStatusTarget = [1, userId];
            let action = [[insertOrder, insertOrderTarget], [updatePaidStatus, updatePaidStatusTarget]];
            await dbTransaction(action);    
            return res.send({paymentStatus});
        }
    } catch(error){
        return res.status(400).send({
            msg: error.message
        })
    }


})

module.exports = router;