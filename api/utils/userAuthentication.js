/* eslint-disable camelcase */
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const usersRepository = require('../repositories/UsersRepository');

// native register authentication
// check name, email duplication
const registerOptions = {
  usernameField: "name", passwordField: "email", passReqToCallback: true,
};

passport.use('register', new LocalStrategy(
  registerOptions,
  async function (req, name, email, done) {
    const usersRepoInstance = usersRepository();
    const ifNameExist = await usersRepoInstance.checkExistence({ name });
    const ifEmailExist = await usersRepoInstance.checkExistence({ email });

    if (ifNameExist) {
      return done(false, { errMsg: 'Passport Unauthorized: Duplicated Username.' });
    }
    if (ifEmailExist) {
      return done(false, { errMsg: 'Passport Unauthorized: Duplicated Email.' });
    }
    return done(null, { name, email, password: req.body.password });
  }
));


// native login authentication
// check if email exists, if password is correct
const loginOptions = {
  usernameField: "email", passwordField: "password"
};

passport.use('login', new LocalStrategy(
  loginOptions,
  async function (email, password, done) {
    const usersRepoInstance = usersRepository();
    const ifEmailExist = await usersRepoInstance.checkExistence({ email });
    if (!ifEmailExist) {
      return done(false, { errMsg: 'Passport Unauthorized: Valid Email Does Not Exist.' });
    }
    const verifyPassword = await usersRepoInstance.verifyPassword(email, password);
    if (!verifyPassword) {
      return done(false, { errMsg: 'Passport Unauthorized: Wrong Password.' });
    }
    const { id } = await usersRepoInstance.findOne({email});
    return done(null, { id });
  }
));


// facebook register / login
// perform fb authentication, then callback router performs new fb user registration or old fb user login
const facebookOptions = {
  clientID: process.env.FB_CLIENT_ID,
  clientSecret: process.env.FB_CLIENT_SECRET,
  callbackURL: process.env.REACT_APP_WEBSITE_URL + "/api/v1/users/fbRegisterSignin/callback",
  profileFields: ['id', 'displayName', 'email']
};

passport.use("fb", new FacebookStrategy(facebookOptions,
  async (accessToken, refreshToken, profile, done) => {
    const usersRepoInstance = usersRepository();
    const user = await usersRepoInstance.findOne({ fb_uid: profile._json.id });
    if (!user) {
      if (profile._json.email) {
        const ifEmailExists = usersRepoInstance.checkExistence({ email: profile._json.email });
        if (ifEmailExists) {
          const err = new Error(
            "Email associated to Facebook acount already exists. " +
            "Account association will be implemented in the future."
          );
          return done(err, false);
        }
      }
      const fbUser = {
        existed: 0,
        fbUid: profile._json.id,
        fbAccessToken: accessToken,
        name: profile._json.name,
        email: profile._json.email ? profile._json.email : null,
      };
      done(null, fbUser);
    } else {
      const fbUser = Object.assign(user, { existed: 1 });
      done(null, fbUser);
    }
  }
));


const extractJwtFromCookie = (cookieName) => {
  return (request) => {
      let token = null;
      if (request.cookies && request.cookies[cookieName]) {
          token = request.cookies[cookieName];
      }
      return token;
  };
};

const jwtOptions = {
  secretOrKey: process.env.JWT_SECRET,
  jwtFromRequest: extractJwtFromCookie("jwt"),
};

passport.use('jwt', new JwtStrategy(jwtOptions, async (payload, done) => {
  if (payload.sub === undefined) {
    return done(false, { errMsg: 'No Jwt payload extracted.' });
  }
  const usersRepoInstance = usersRepository(); 
  const user = await usersRepoInstance.findOne( {id: payload.sub} );
  if (user) {
    return done(null, user);
  } else {
    return done(false, { errMsg: 'User not signed in.' });
  }  
}));



module.exports = {
  authenticator: strategy => passport.authenticate(strategy, { session: false }),
};