const Product = require("../models/Product");

const createProductController = async (name, description, price, stock, category, image) => {
  const productExist = await Product.findOne({ name });
  if (productExist) {
    throw new Error("Producto ya Registrado");
  };

  const newProduct = new Product({
    name, description, price, stock, category, image
  });

  await newProduct.save();

  return {
    message: "Producto creado exitosamente",
    product: newProduct
  };
};

const getAllProductController = async () => {
  const products = await Product.find();

  if (!products.length) {
    throw new Error(`No hay productos`);
  };

  return {
    message: "Productos encontrados",
    products
  };
};

const getProductByNameController = async (name) => {
  const productByName = await Product.find({ name });
  if (!productByName.length) {
    throw new Error(`No se encontró el producto`);
  };
  return {
    message: "Productos encontrados",
    product: productByName
  };
};

const getOneProductByIdController = async (id) => {
  const productById = await Product.findById(id);
  if (!productById)
    throw new Error(`No se encontró el producto con ese ID`);

  return {
    message: "Usuario encontrado",
    product: productById
  };
};

const updateProductController = async (id, name, description, price, stock, category, image) => {

  const newProduct = { name, description, price, stock, category, image };
  const updateProduct = await Product.findByIdAndUpdate(id, newProduct, { new: true });

  if (!updateProduct) {
    throw new Error("Producto no encontrado");
  }

  return {
    message: "Producto actualizado exitosamente",
    product: updateProduct
  };
};

const deleteProductController = async (id) => {
  const deleteProduct = await Product.findByIdAndDelete(id);
  if (!deleteProduct)
    throw new Error(`Producto no encontrado`);

  return {
    message: "Producto eliminado exitosamente",
    product: deleteProduct
  };
};

module.exports = {
  createProductController,
  getAllProductController,
  getProductByNameController,
  getOneProductByIdController,
  updateProductController,
  deleteProductController
}