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
  return newProduct;
};

const getAllProductController = async () => {
  const products = await Product.find();

  if (!products.length) {
    throw new Error(`No hay productos`);
  };

  return products;
};

const getProductByNameController = async (name) => {
  const productByName = await Product.find({ name });
  if (!productByName.length) {
    throw new Error(`No se encontró el producto`);
  };
  return productByName;
};

const getOneProductByIdController = async (id) => {
  const productById = await Product.findById(id);
  if (!productById)
    throw new Error(`No se encontró el usuario con ese ID`);
  return productById;
};

const updateProductController = async (id, name, description, price, stock, category, image) => {

  const newProduct = { name, description, price, stock, category, image };
  const updateProduct = await Product.findByIdAndUpdate(id, newProduct, { new: true });

  if (!updateProduct) {
    throw new Error("Producto no encontrado");
  }

  return updateProduct;
};

const deleteProductController = async (id) => {
  const deleteProduct = await Product.findByIdAndDelete(id);
  return deleteProduct;
};

module.exports = {
  createProductController,
  getAllProductController,
  getProductByNameController,
  getOneProductByIdController,
  updateProductController,
  deleteProductController
}