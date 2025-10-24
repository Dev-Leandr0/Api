const Category = require('../Category');
const Product = require('../Product');

/* 
Relaciones Categoría - Product
 * Una categoría puede tener múltiples productos.
 * Al eliminar una categoría, los productos asociados **no se eliminan**, 
 * sino que su campo categoryId se pone en NULL (onDelete: SET NULL). 
 * Al actualizar la categoría, los productos se actualizan en cascada (onUpdate: CASCADE).
*/
Category.hasMany(Product, {
  as: 'products',
  foreignKey: 'categoryId',
  onDelete: 'SET NULL',
  onUpdate: 'CASCADE'
});

Product.belongsTo(Category, {
  as: 'category',
  foreignKey: 'categoryId'
});
/* --------------------------------------------------- */

module.exports = {
  Category,
  Product,
};
