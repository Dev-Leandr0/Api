require('dotenv').config();
const { Sequelize } = require('sequelize');

const { POSTGRESQL_DB, POSTGRESQL_USER, POSTGRESQL_PASS } = process.env;

const sequelize = new Sequelize(
  process.env.POSTGRESQL_DB,
  process.env.POSTGRESQL_USER,
  process.env.POSTGRESQL_PASS,
  {
    host: 'localhost',
    dialect: 'postgres',
    logging: false
  }
);

module.exports = { sequelize };