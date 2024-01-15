const { StatusCodes } = require('http-status-codes');
const { find, isPlainObject } = require('lodash');

class CartUpdateController {
    constructor(redisClientService) {
        this.redisClientService = redisClientService;
    }

    async index(req, res) {
        const cartId = req.session.cartId;
        const cartItem = req.body;
        // 0. get cart, parse item from string into JSON
        const existedCartId = await this.redisClientService.scan('cart:*');
        if (typeof existedCartId[0] === 'undefined') {
            const newCart = { content: [cartItem] };
            await this.redisClientService.jsonSet(`cart:${cartId}`, '.', JSON.stringify(newCart));
            return res.sendStatus(StatusCodes.OK);
        }
        let existedCartItems = await this.redisClientService.jsonGet(existedCartId[0]);
        existedCartItems = JSON.parse(existedCartItems).content;
        // 1. if obj.productId & obj.color & obj.size can be find in cart: 
        // 1-1. incrementBy += 1, stockMaxQuantity -= 1
        // 1-2. jsonSet new JSON.stringity()
        const theExistedObj = find(existedCartItems, (obj) => {
            return obj.color === cartItem.color && obj.size === cartItem.size && obj.title === cartItem.title;
        });
        if (theExistedObj) {
            if (theExistedObj.stockMaxQuantity - 1 <= 0) {
                return res.status(StatusCodes.BAD_REQUEST).send({ message: 'Not enough products in stock' });
            };
            theExistedObj.stockMaxQuantity -= 1;
            theExistedObj.incrementBy += 1;
            const newCart = { content: existedCartItems };
            await this.redisClientService.jsonSet(`cart:${cartId}`, '.', JSON.stringify(newCart));
            return res.json({ cartLength: existedCartItems.length });
        } else {
            // 2. else: 
            // 2-1. push the newcartitem into JSON
            // 2-2. jsonSet new JSON.stringity()
            existedCartItems.push(cartItem);
            const newCart = { content: existedCartItems };
            await this.redisClientService.jsonSet(`cart:${cartId}`, '.', JSON.stringify(newCart));
            return res.json({ cartLength: existedCartItems.length });
        }
    }

    async updateCart(req, res){
        const cartId = req.session.cartId;
        const newcartItems = req.body;
        const newCart = { content: newcartItems };
        await this.redisClientService.jsonSet(`cart:${cartId}`, '.', JSON.stringify(newCart));
        return res.sendStatus(StatusCodes.OK);
    }
}

module.exports = CartUpdateController;
