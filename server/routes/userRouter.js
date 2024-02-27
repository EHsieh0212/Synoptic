const { Router } = require('express');
const router = Router();
const { authenticator } = require('../utils/userAuthentication');
const { signJwt } = require('../utils/jwt');
const { asyncHandler } = require('../utils/asyncHandler');
const users = require('../services/users');

router.post(
  '/register',
  authenticator('register'),
  asyncHandler(async (req, res) => {
    const authFail = req.user.errMsg;
    if (authFail) {
      const errorMessage = authFail || 'Registration Validation Failed';
      const err = Object.assign(new Error(errorMessage), { status: 401, msg: authFail });
      throw err;
    }

    const { name, email, password } = req.user;
    const signupResult = await users.natvieRegister(name, email, password);
    if (signupResult) {
      res.json(signupResult);
    } else {
      const errMsg = 'Router Level Error: Resource not found (Return Empty)';
      const err = Object.assign(new Error(errMsg), { status: 404, msg: errMsg });
      throw err;
    }
  }),
);

router.get('/fbRegisterSignin', authenticator('fb'));

router.get(
  '/fbRegisterSignin/callback',
  authenticator('fb'),
  signJwt,
  asyncHandler(async (req, res) => {
    const { existed, fbUid, fbAccessToken, name, email } = req.user;
    if (!existed) {
      const registerResult = await users.fbRegister(fbUid, fbAccessToken, name, email);
      if (!registerResult) {
        const errMsg = 'Router Level Error: Resource not found (Return Empty)';
        const err = Object.assign(new Error(errMsg), { status: 404, msg: errMsg });
        next(err);
      }
    } else {
      const loginDate = new Date();
      const signInResult = await users.fbSignIn(fbUid, fbAccessToken, loginDate);
      if (signInResult[0] === 0) {
        const errMsg = 'Router Level Error: Resource not found (Return Empty)';
        const err = Object.assign(new Error(errMsg), { status: 404, msg: errMsg });
        next(err);
      }
    }
    res.redirect(process.env.REACT_APP_WEBSITE_URL);
  }),
);

router.post(
  '/signIn',
  authenticator('login'),
  signJwt,
  asyncHandler(async (req, res) => {
    const authFail = req.user.errMsg;
    if (authFail) {
      const errorMessage = authFail || 'Registration Validation Failed';
      const err = Object.assign(new Error(errorMessage), { status: 401, msg: authFail });
      throw err;
    }
    res.json(req.user);
  }),
);

router.get(
  '/profile',
  authenticator('jwt'),
  asyncHandler(async (req, res) => {
    const jwtFail = req.user.errMsg;
    if (jwtFail) {
      const errorMessage = jwtFail || 'Jwt Validation Failed';
      const err = Object.assign(new Error(errorMessage), { status: 401, msg: jwtFail });
      throw err;
    }
    res.json(req.user);
  }),
);

// delete jwt in server side
router.get(
  '/logout',
  asyncHandler(async (req, res) => {
    res.clearCookie('jwt').status(204).end();
  }),
);

module.exports = router;
