const { DataTypes } = require('sequelize');
const { sequelize } = require('../db/database');

const Category = sequelize.define(
  'category',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  }, {
  tableName: 'categories',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

module.exports = Category;