const { DataTypes } = require('sequelize');
const { dbClient } = require('../init');

const Products = dbClient.define('products', {
  id: { type: DataTypes.INTEGER, field: 'id', primaryKey: true, autoIncrement: true },
  category: { type: DataTypes.ENUM('men', 'women'), field: 'category' },
  title: { type: DataTypes.STRING, field: 'title' },
  price: { type: DataTypes.INTEGER, field: 'price' },
  imgSrc: { type: DataTypes.STRING, field: 'img_src' },
  description: { type: DataTypes.STRING, field: 'description' },
  more: { type: DataTypes.STRING, field: 'more' },
  createdAt: { type: DataTypes.DATE, field: 'created_at' },
  updatedAt: { type: DataTypes.DATE, field: 'updated_at' },
});

module.exports = {
  Products,
};
