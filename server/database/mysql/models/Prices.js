const { DataTypes } = require('sequelize');
const { dbClient } = require('../init');

const Prices = dbClient.define('prices', {
  id: { type: DataTypes.INTEGER, field: 'id', primaryKey: true, autoIncrement: true },
  productId: { type: DataTypes.INTEGER, field: 'product_id' },
  price: { type: DataTypes.INTEGER, field: 'price' },
  createdAt: { type: DataTypes.DATE, field: 'created_at' },
  updatedAt: { type: DataTypes.DATE, field: 'updated_at' },
});

module.exports = {
  Prices,
};
