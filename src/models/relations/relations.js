const cartRelations = require('./cartRelations');
const orderRelations = require('./orderRelations');
const productRelations = require('./productRelations');

module.exports = {
  ...cartRelations,
  ...orderRelations,
  ...productRelations,
}