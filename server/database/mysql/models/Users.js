const { DataTypes } = require('sequelize');
const { dbClient } = require('../init');

const Users = dbClient.define('users', {
    id: { type: DataTypes.UUID, field: 'id', primaryKey: true },
    fbUid: { type: DataTypes.STRING, field: 'fb_uid' },
    fbAccessToken: { type: DataTypes.STRING, field: 'fb_access_token' },
    name: { type: DataTypes.STRING, field: 'name' },
    email: { type: DataTypes.STRING, field: 'email' },
    password: { type: DataTypes.STRING, field: 'password' },
    phone: { type: DataTypes.STRING, field: 'phone' },
    address: { type: DataTypes.STRING, field: 'address' },
    createdAt: { type: DataTypes.DATE, field: 'created_at' },
    updatedAt: { type: DataTypes.DATE, field: 'updated_at' },
});

module.exports = {
    Users,
};