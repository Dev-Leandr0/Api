const Product = require("../models/Product");
const Category = require("../models/Category");

const createProductController = async (productData) => {

  const { name, description, price, stock, categoryId, image, isActive } = productData

  const productExist = await Product.findOne({ where: { name } });
  if (productExist) {
    const err = new Error("Producto ya Registrado");
    err.status = 409;
    throw err;
  };

  const newProduct = await Product.create({ name, description, price, stock, categoryId, image, isActive });

  return {
    message: "Producto creado exitosamente",
    product: newProduct
  };
};

// Todos
const getAllProductController = async () => {

  const products = await Product.findAll();

  if (!products.length) {
    const err = new Error("No hay Productos");
    err.status = 404;
    throw err;
  };

  return {
    message: "Productos encontrados",
    products,
  };
};

// Nombre
const getProductByNameController = async (name) => {

  const productsByName = await Product.findAll({ where: { name } });

  if (productsByName.length === 0) {
    const err = new Error(`No se encontró ningún producto con ese nombre`);
    err.status = 404;
    throw err;
  };

  return {
    message: "producto encontrado",
    productsByName: productsByName,
  };
};

// Id
const getOneProductByIdController = async (id) => {

  const productById = await Product.findByPk(id);

  if (!productById) {
    const err = new Error(`No se encontró el producto con ese ID`);
    err.status = 404;
    throw err;
  }

  return {
    message: "Usuario encontrado",
    product: productById
  };
};

// Categoría
const getProductsByCategoryController = async (categoryId) => {

  const products = await Product.findAll({
    where: { categoryId },
    include: [{ model: Category, as: 'category', attributes: ['id', 'name'] }],
  });

  if (products.length === 0) {
    const err = new Error("No hay productos en esta categoría");
    err.status = 404;
    throw err;
  }

  return {
    message: "Productos encontrados",
    products,
  };
};

const updateProductController = async (id, productData) => {

  const { name, description, price, stock, categoryId, image, isActive } = productData;

  const productById = await Product.findByPk(id);

  if (!productById) {
    const err = new Error("Producto no encontrado");
    err.status = 404;
    throw err;
  }

  const updatedFields = {
    name,
    description,
    price,
    stock,
    category,
    image,
    isActive,
  };

  const updateProduct = await productById.update(updatedFields);

  return {
    message: "Producto actualizado",
    product: updateProduct
  };
};

const deleteProductController = async (id) => {

  const deleteProduct = await Product.findByPk(id);

  if (!deleteProduct) {
    const err = new Error(`Producto no encontrado`);
    err.status = 404;
    throw err;
  }

  await deleteProduct.destroy();

  return {
    message: "Producto eliminado",
    product: deleteProduct
  };
};

module.exports = {
  createProductController,
  getAllProductController,
  getProductByNameController,
  getOneProductByIdController,
  updateProductController,
  deleteProductController,
  getProductsByCategoryController,
}