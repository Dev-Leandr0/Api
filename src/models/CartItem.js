const { DataTypes } = require('sequelize');
const { sequelize } = require('../db/database');

const CartItem = sequelize.define(
  'CartItem',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      validate: {
        min: 1,
        isInt: true,
      },
    },

    // Claves foráneas
    cartId: {
      type: DataTypes.UUID,
      allowNull: false,
      isUUID: 4,
    },
    productId: {
      type: DataTypes.UUID,
      allowNull: false,
      isUUID: 4,
    },
  },
  {
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    indexes: [
      {
        unique: true,
        fields: ['cartId', 'productId']
      }
    ]
  }
);

module.exports = CartItem;