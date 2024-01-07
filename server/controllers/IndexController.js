class CartIndexController {
    constructor(redisClientService) {
        this.redisClientService = redisClientService;
    }

    async index(req, res) {
        const existedCartId = await this.redisClientService.scan('cart:*');
        let cartItems = await this.redisClientService.jsonGet(existedCartId[0]);
        cartItems = JSON.parse(cartItems).content;
        let cartLength = 0;
        return res.send({ cartLength: cartItems.length });
    }
}

module.exports = CartIndexController;
