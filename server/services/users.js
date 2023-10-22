const { v4: uuidv4 } = require('uuid');
const bcrpyt = require('bcrypt');
const usersRepository = require('../repositories/UsersRepository');


// 1. hash password. 2.uuid. 3.insert into user table
const signUp =  async (name, email, password) => {
    const id = uuidv4();
    const hashedPassword = await bcrpyt.hash(password, 10);
    const date = new Date();
    const usersRepositoryInstance = usersRepository();
    const newUser = await usersRepositoryInstance.registerUser(id, name, email, hashedPassword, date, date);
    return newUser;
};

module.exports = {
    signUp,
}


