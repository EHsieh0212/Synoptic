const { DataTypes } = require('sequelize');
const { dbClient } = require('../init');

const OrderedItems = dbClient.define('ordered_items', {
  id: { type: DataTypes.INTEGER, field: 'id', primaryKey: true, autoIncrement: true },
  orderId: { type: DataTypes.INTEGER, field: 'order_id' },
  variantId: { type: DataTypes.INTEGER, field: 'variant_id' },
  number: { type: DataTypes.INTEGER, field: 'number' },
  createdAt: { type: DataTypes.DATE, field: 'created_at' },
  updatedAt: { type: DataTypes.DATE, field: 'updated_at' },
});

module.exports = {
  OrderedItems,
};
