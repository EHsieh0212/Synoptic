const jwt = require('jsonwebtoken');

const signOptions = {
    issuer: process.env.PRODUCT_OWNER,
    expiresIn: "1 day",
};

const cookieOptions = {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000
};

const signJwt = (req, res, next) => {
    const payload = {
        sub: req.user.id,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, signOptions);
    res.cookie("jwt", token, cookieOptions);
    next();
};


module.exports = {
    signJwt,
}