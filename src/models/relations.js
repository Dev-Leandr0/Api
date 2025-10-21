const User = require('./User');
const Product = require('./Product');
const Cart = require('./Cart');
const Category = require('./Category');

// Relaciones User - Cart
User.hasMany(Cart, { foreignKey: 'userId' });
Cart.belongsTo(User, { foreignKey: 'userId' });

// Relaciones Product - Cart
Product.hasMany(Cart, { foreignKey: 'productId' });
Cart.belongsTo(Product, { foreignKey: 'productId' });

// Relaciones Categoria - Product
Category.hasMany(Product, { foreignKey: 'categoryId', as: 'products' });
Product.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });


module.exports = {
  User,
  Product,
  Cart,
  Category,
}