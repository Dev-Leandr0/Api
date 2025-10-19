const User = require('./User');
const Product = require('./Product');
const Cart = require('./Cart');

// Relaciones User - Cart
User.hasMany(Cart, { foreignKey: 'userId' });
Cart.belongsTo(User, { foreignKey: 'userId' });

// Relaciones Product - Cart
Product.hasMany(Cart, { foreignKey: 'productId' });
Cart.belongsTo(Product, { foreignKey: 'productId' });

module.exports = {
  User,
  Product,
  Cart
}