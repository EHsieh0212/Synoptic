const { once, get } = require('lodash');
const { Op } = require('sequelize');
const { GenericRepository } = require('./base/GenericRepository');
const { Users } = require('../database/mysql/models/Users');
const bcrypt = require("bcrypt");

class UsersRepository extends GenericRepository {
    async registerUser(id, name, email, password, createdAt, updatedAt) {
        const entity = {
            id, name, email, password, createdAt, updatedAt
        };
        return await this.insertOne(entity);
    }

    async checkExistence(query) {
        const ifExist = await this.findOne(query);
        const result = ifExist ? 1 : 0;
        return result;
    }

    async verifyPassword(email, password) {
        const storedPassword = await this.findOne({ email }).then(result => result.password);
        const verify = await bcrypt.compare(password, storedPassword);
        return verify;
    }



};

module.exports = once(() => new UsersRepository(Users));