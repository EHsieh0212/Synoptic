const crypto = require('crypto');

module.exports = (req, res, next) => {
    console.log('-----------')
    console.log(req.session)
    if (req.session && req.session.cartId) {
        return next();
    }

    req.session.cartId = crypto.randomBytes(16).toString('hex');
    console.log(req.session.cartId)

    return next();
};
