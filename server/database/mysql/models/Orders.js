const { DataTypes } = require('sequelize');
const { dbClient } = require('../init');

const Orders = dbClient.define('orders', {
    id: { type: DataTypes.INTEGER, field: 'id', primaryKey: true, autoIncrement: true },
    userId: { type: DataTypes.STRING, field: 'user_id' },
    amount: { type: DataTypes.INTEGER, field: 'amount' },
    recipientFirstName: { type: DataTypes.STRING, field: 'recipient_first_name' },
    recipientLastName: { type: DataTypes.STRING, field: 'recipient_last_name' },
    email: { type: DataTypes.STRING, field: 'email' },
    phone: { type: DataTypes.STRING, field: 'phone' },
    postalCode: { type: DataTypes.INTEGER, field: 'postal_code' },
    address: { type: DataTypes.STRING, field: 'address' },
    addressAdditional: { type: DataTypes.STRING, field: 'address_additional' },
    paid: { type: DataTypes.INTEGER, field: 'paid' },
    payment: { type: DataTypes.JSON, field: 'payment' },
    createdAt: { type: DataTypes.DATE, field: 'created_at' },
    updatedAt: { type: DataTypes.DATE, field: 'updated_at' },
});

module.exports = {
    Orders,
};

