const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String
    },
    description: {
      type: String
    },
    price: {
      type: Number
    },
    stock: {
      type: Number
    },
    category: {
      type: String
    },
    image: {
      type: String
    },
    isActive: {
      type: Boolean,
      default: true
    },
  },
  {
    timestamps: true,
    versionKey: false
  }
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;