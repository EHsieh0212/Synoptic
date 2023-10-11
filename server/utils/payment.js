const axios = require('axios');

async function tapPayAction(prime){
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
                return(await getResponse(response));
            } catch(error){
                console.log(error)
                throw error;
            }
        })
    } catch(error){
        throw error;
    }
}

function getResponse(response){
    return new Promise((resolve, reject) => {
        const paymentDetails = response.data;
        const paymentStatus = response.data.status;
        result = {paymentDetails, paymentStatus};
        resolve(result);
        reject(new Error("errrrr"));
    })
}


module.exports = {tapPayAction};


// why promises cannot reach to router?
// todo: cannot get data from async func. fix it