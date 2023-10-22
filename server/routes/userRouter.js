const { Router } = require('express');
const router = Router();
const { authenticator } = require('../utils/userAuthentication');
const { signJwt, removeJwt } = require('../utils/jwtAuthentication');
const { asyncHandler } = require('../utils/asyncHandler');
const users = require('../services/users');

router.post('/signUp', authenticator('register'), asyncHandler(async (req, res) => {
    const authFail = req.user.errMsg;
    if (authFail) {
        const errorMessage = authFail || 'Registration Validation Failed';;
        const err = Object.assign(new Error(errorMessage), { status: 401, msg: authFail });
        throw err;
    }

    const { name, email, password } = req.user;
    const signupResult = await users.signUp(name, email, password);
    if (signupResult) {
        res.json(signupResult);
    } else {
        const errMsg = "Router Level Error: Resource not found (Return Empty)";
        const err = Object.assign(new Error(errMsg), { status: 404, msg: errMsg, content: result });
        console.log(signupResult);
        throw err;
    }
}));


router.post('/signIn', authenticator('login'), signJwt, asyncHandler(async (req, res) => {
    const authFail = req.user.errMsg;
    if (authFail) {
        const errorMessage = authFail || 'Registration Validation Failed';;
        const err = Object.assign(new Error(errorMessage), { status: 401, msg: authFail });
        throw err;
    }
    res.json(res.user);
}));


// user profile
// router.get('/profile', IsLoggedIn, async (req, res) => {
//     try {
//         const user = req.user;
//         return res.json({
//             id: user.userId,
//             name: user.userName,
//             email: user.userEmail,
//             password: user.userPassword
//         });
//     } catch (error) {
//         return res.status(400).send({
//             msg: error.message
//         })
//     }
// })



module.exports = router;

