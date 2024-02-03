const { StatusCodes } = require('http-status-codes');

class CartIndexController {
    constructor(redisClientService){
        this.redisClientService = redisClientService;
    }
    async index(req, res){
        const cartId = req.session.cartId;
        console.log('==============')
        console.log(cartId)
        let existedCartItems = await this.redisClientService.jsonGet(`cart:${cartId}`);
        console.log(existedCartItems)
        if (!existedCartItems){
            return res.status(StatusCodes.BAD_REQUEST).send({ message: `Cannot retrieve cart data. session id: ${cartId}` });
        }
        existedCartItems = JSON.parse(existedCartItems).content;
        
        return res.send({cart: existedCartItems});
    }

};

module.exports = CartIndexController;
