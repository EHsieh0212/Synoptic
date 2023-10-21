const Sequelize = require('sequelize');
require('dotenv').config();

if (!process.env.DB_HOST ||
    !process.env.DB_USER ||
    !process.env.DB_PWD) {
    throw new Error("HOST/USER/PWD should be set in environment variables");
}

const dbClient = new Sequelize({
  dialect: 'mysql',
  username: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  define: { freezeTableName: true },
  timezone: '+00:00',
  query: { raw: true },
});

module.exports = {
  dbClient,
};
