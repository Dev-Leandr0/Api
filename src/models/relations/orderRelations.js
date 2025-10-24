// Modelos principales
const User = require('../User');
const Product = require('../Product');

// Modelos de orden
const Order = require('../Order');
const OrderItem = require('../OrderItem');

/* 
Relaciones User - Order
  * Un usuario puede tener múltiples órdenes.
  * Al eliminar un usuario, sus órdenes se eliminan(CASCADE). 
*/
User.hasMany(Order, {
  as: 'orders',
  foreignKey: 'userId',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

Order.belongsTo(User, {
  as: 'user',
  foreignKey: 'userId',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});
/* --------------------------------------------------- */

/* 
Relaciones Order - OrderItem
 * Una orden puede tener múltiples ítems.
 * Al eliminar una orden, sus ítems se eliminan (CASCADE). 
*/
Order.hasMany(OrderItem, {
  as: 'items',
  foreignKey: 'orderId',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

OrderItem.belongsTo(Order, {
  as: 'order',
  foreignKey: 'orderId',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});
/*
Relaciones Product - OrderItem
 * Un producto puede estar en múltiples ítems de órdenes.
 * Al eliminar un producto, los ítems asociados se eliminan (CASCADE). 
*/
Product.hasMany(OrderItem, {
  as: 'orderItems',
  foreignKey: 'productId',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

OrderItem.belongsTo(Product, {
  as: 'product',
  foreignKey: 'productId',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});
/* --------------------------------------------------- */

module.exports = {
  User,
  Order,
  OrderItem,
};