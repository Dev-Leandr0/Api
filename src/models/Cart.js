const { DataTypes } = require('sequelize');
const { sequelize } = require('../db/database');

const Cart = sequelize.define(
  'cart',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      validate: {
        min: 1,
      },
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },

    // Claves foráneas
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      onDelete: 'CASCADE',
    },
    productId: {
      type: DataTypes.UUID,
      allowNull: false,
      onDelete: 'CASCADE',
    },
  },
  {
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ['userId', 'productId']
      }
    ]
  }
);

module.exports = Cart;