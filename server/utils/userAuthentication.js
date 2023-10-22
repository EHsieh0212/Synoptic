const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
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
  async function(email, password, done) {
    const usersRepoInstance = usersRepository();
    const ifEmailExist = await usersRepoInstance.checkExistence({ email });
    if (!ifEmailExist) {
      return done(false, { errMsg: 'Passport Unauthorized: Valid Email Does Not Exist.' });
    }
    const verifyPassword = await usersRepoInstance.verifyPassword(email, password);
    if (!verifyPassword) {
      return done(false, { errMsg: 'Passport Unauthorized: Wrong Password.'});
    }
    return done(null, true);
  }
));



module.exports = {
  authenticator: strategy => passport.authenticate(strategy, { session: false })
};