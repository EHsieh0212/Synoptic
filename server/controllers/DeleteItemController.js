const { StatusCodes } = require('http-status-codes');

class CartDeleteItemController {
    constructor(redisClientService) {
        this.redisClientService = redisClientService;
    }

    async index(req, res) {
        const cartId = req.session.cartId;
        const productId = req.params.id;

        const quantityInCart =
            parseInt(await this.redisClientService.hget(`cart:${cartId}`, `product:${productId}`)) || 0;
        // for now, no need to take care of stock
        if (quantityInCart) {
            await this.redisClientService.hdel(`cart:${cartId}`, `product:${productId}`);  
        }

        return res.sendStatus(StatusCodes.NO_CONTENT);
    }
}

module.exports = CartDeleteItemController;
