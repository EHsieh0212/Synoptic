const axios = require('axios');

const tapPayAction = async (thePrime, amount, firstName, lastName, email, phone, orderId, cartDetails) => {
    const body = {
        "prime": thePrime,
        "partner_key": process.env.TP_PARTNER_KEY,
        "merchant_id": process.env.TP_MERCHANT_ID,
        "amount": amount,
        "order_number": orderId.toString(),
        "currency": "TWD",
        "details": cartDetails.map(v => `${v.variantId}`).join(","),
        "cardholder": {
            "phone_number": phone,
            "name": `${firstName}_${lastName}`,
            "email": email
        },
    };
    const result = await axios.post('https://sandbox.tappaysdk.com/tpc/payment/pay-by-prime', body, {
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': process.env.TP_PARTNER_KEY,
        }
    });

    if (parseInt(result.data.status) === 0) {
        return result.data;
    } else {
        throw result.data;
    }
};


module.exports = { tapPayAction };