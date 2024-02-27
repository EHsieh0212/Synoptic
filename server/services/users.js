const { v4: uuidv4 } = require('uuid');
const bcrpyt = require('bcrypt');
const usersRepository = require('../repositories/UsersRepository');

// with uuid, hashed pwd
const natvieRegister = async (name, email, password) => {
  const id = uuidv4();
  const hashedPassword = await bcrpyt.hash(password, 10);
  const date = new Date();
  const usersRepositoryInstance = usersRepository();
  const newUser = await usersRepositoryInstance.registerUser(
    id,
    name,
    email,
    hashedPassword,
    date,
    date,
  );
  return newUser;
};

// with uuid, fb_id, fb_access_token, email from fb. no pwd.
const fbRegister = async (fbUid, fbAccessToken, name, email) => {
  const id = uuidv4();
  const date = new Date();
  const usersRepositoryInstance = usersRepository();
  const newFbUser = await usersRepositoryInstance.registerUserFromFb(
    id,
    name,
    email,
    fbUid,
    fbAccessToken,
    date,
    date,
  );
  return newFbUser;
};

const fbSignIn = async (fbUid, fbAccessToken, loginDate) => {
  const usersRepositoryInstance = usersRepository();
  const updatedFbUser = await usersRepositoryInstance.loginUserFromFb(
    fbUid,
    fbAccessToken,
    loginDate,
  );
  return updatedFbUser;
};

module.exports = {
  natvieRegister,
  fbRegister,
  fbSignIn,
};
