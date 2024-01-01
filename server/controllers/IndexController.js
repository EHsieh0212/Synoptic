class CartIndexController {
    constructor(redisClientService) {
        this.redisClientService = redisClientService;
    }

    async index(req, res) {
        const { cartId } = req.session;
        let productList = [];

        const cartList = await this.redisClientService.hgetall(`cart:${cartId}`);
        console.log(`cartId: ${cartId}`)

        if (!cartList) {
            return res.send(productList);
        }

        for (const itemKey of Object.keys(cartList)) {
            // for now we do not store product info in Redis
            // const product = await this.redisClientService.jsonGet(itemKey);
            productList.push({ product: itemKey.split(':')[1], quantity: cartList[itemKey] });
        }
        return res.send(productList);
    }
}

module.exports = CartIndexController;
