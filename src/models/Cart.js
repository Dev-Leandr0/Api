const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema(
  {
    product: {
      type: String,
      required: true
    },
    cantidad: {
      type: String,
      required: true
    },
    email: {
      type: String,
      unique: true,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    phone: {
      type: String
    },
    isActive: {
      type: Boolean, default: true
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },

  },
  {
    versionKey: false,
  }
);

const Cart = mongoose.model('Cart', userSchema);

module.exports = Cart;