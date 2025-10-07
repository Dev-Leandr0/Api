const { Router } = require('express');

const productRoutes = Router();

// Productos
productRoutes.get('/', (req, res) => {
  res.send('Traer los productos');
})

productRoutes.get('/:id', (req, res) => {
  const { id } = req.params;
  res.send(`Traeme el producto con id ${id}`);
});

productRoutes.post('/', (req, res) => {
  res.send('Producto creado');
});

productRoutes.put('/:id', (req, res) => {
  res.send('Producto Actualizado');
});

productRoutes.delete('/:id', (req, res) => {
  res.send('Producto eliminado');
});

module.exports = productRoutes;
