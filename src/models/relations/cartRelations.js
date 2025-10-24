// Modelos principales
const User = require('../User');
const Product = require('../Product');

// Modelos de carrito
const Cart = require('../Cart');
const CartItem = require('../CartItem');

/* 
Relaciones # User - Cart
 * Un usuario puede tener solo un carrito. 
 * Al eliminar un usuario, su carrito asociado se elimina también (CASCADE). 
*/
User.hasOne(Cart, {
  as: 'cart',
  foreignKey: 'userId',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

Cart.belongsTo(User, {
  as: 'user',
  foreignKey: 'userId',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});
/* --------------------------------------------------- */

/* 
Relaciones Cart - CartItem
 * Un carrito puede tener múltiples ítems. 
 * Al eliminar un carrito, sus ítems asociados se eliminan también (CASCADE). 
*/
Cart.hasMany(CartItem, {
  as: 'items',
  foreignKey: 'cartId',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

CartItem.belongsTo(Cart, {
  as: 'cart',
  foreignKey: 'cartId',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

/* 
Relaciones Product - CartItem
 * Un producto puede estar en múltiples ítems de carritos distintos. 
 * Al eliminar un producto, los ítems asociados se eliminan también (CASCADE). 
*/
Product.hasMany(CartItem, {
  as: 'cartItems',
  foreignKey: 'productId',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

CartItem.belongsTo(Product, {
  as: 'product',
  foreignKey: 'productId',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});
/* --------------------------------------------------- */

module.exports = {
  User,
  Cart,
  CartItem,
};