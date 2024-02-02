const { DataTypes } = require('sequelize');
const { dbClient } = require('../init');

const Variants = dbClient.define('variants', {
    id: { type: DataTypes.INTEGER, field: 'id', primaryKey: true, autoIncrement: true },
    productId: { type: DataTypes.INTEGER, field: 'product_id' },
    size: { type: DataTypes.ENUM('XS','S','M','L','XL'), field: 'size' },
    color: { type: DataTypes.STRING, field: 'color' },
    quantity: { type: DataTypes.INTEGER, field: 'quantity' },
    createdAt: { type: DataTypes.DATE, field: 'created_at' },
    updatedAt: { type: DataTypes.DATE, field: 'updated_at' },
});

module.exports = {
    Variants,
};