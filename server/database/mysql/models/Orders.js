const { DataTypes } = require('sequelize');
const { dbClient } = require('../init');

const Orders = dbClient.define('orders', {
    id: { type: DataTypes.INTEGER, field: 'id', primaryKey: true, autoIncrement: true },
    userId: { type: DataTypes.STRING, field: 'user_id' },
    amount: { type: DataTypes.INTEGER, field: 'amount' },
    recipient: { type: DataTypes.STRING, field: 'recipient' },
    email: { type: DataTypes.STRING, field: 'email' },
    phone: { type: DataTypes.STRING, field: 'phone' },
    address: { type: DataTypes.STRING, field: 'address' },
    deliveryTime: { type: DataTypes.ENUM('morning', 'afternoon', 'not specified'), field: 'delivery_time' },
    paid: { type: DataTypes.INTEGER, field: 'paid' },
    payment: { type: DataTypes.JSON, field: 'payment' },
    createdAt: { type: DataTypes.DATE, field: 'created_at' },
    updatedAt: { type: DataTypes.DATE, field: 'updated_at' },
});

module.exports = {
    Orders,
}

