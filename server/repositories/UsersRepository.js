const { once } = require('lodash');
const { GenericRepository } = require('./base/GenericRepository');
const { Users } = require('../database/mysql/models/Users');
const bcrypt = require('bcrypt');

class UsersRepository extends GenericRepository {
  async registerUser(id, name, email, password, createdAt, updatedAt) {
    const entity = {
      id,
      name,
      email,
      password,
      createdAt,
      updatedAt,
    };
    return await this.insertOne(entity);
  }

  async registerGuestUser(id, email, phone, address) {
    return await this.insertOne({ id, name: 'guest_user', email, phone, address });
  }

  async findGuestUserIdByEmail(email) {
    const attribute = ['id'];
    return await this.findAllWithColumns(attribute, { email });
  }

  async registerUserFromFb(id, name, email, fbUid, fbAccessToken, createdAt, updatedAt) {
    const entity = {
      id,
      name,
      email,
      fbUid,
      fbAccessToken,
      createdAt,
      updatedAt,
    };
    return await this.insertOne(entity);
  }

  async checkExistence(query) {
    const ifExist = await this.findOne(query);
    const result = ifExist ? 1 : 0;
    return result;
  }

  async verifyPassword(email, password) {
    const storedPassword = await this.findOne({ email }).then((result) => result.password);
    const verify = await bcrypt.compare(password, storedPassword);
    return verify;
  }

  async loginUserFromFb(fbUid, fbAccessToken, loginDate) {
    const updateTarget = { fbAccessToken, updatedAt: loginDate };
    return await this.update(updateTarget, { fbUid });
  }
}

module.exports = once(() => new UsersRepository(Users));
