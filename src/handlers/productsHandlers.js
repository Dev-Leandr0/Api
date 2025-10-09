const { createProductController, getOneProductByIdController, updateProductController, deleteProductController, getAllProductController, getProductByNameController } = require('../controllers/productsControllers');

const Joi = require('joi');
const productSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(100)
    .required()
    .messages({
      "string.empty": "El nombre es obligatorio",
      "string.min": "El nombre debe tener al menos 3 caracteres",
      "string.max": "El nombre no puede superar los 100 caracteres",
    }),

  description: Joi.string()
    .max(500)
    .allow("")
    .messages({
      "string.max": "La descripción no puede superar los 500 caracteres",
    }),

  price: Joi.number()
    .min(0)
    .required()
    .messages({
      "number.base": "El precio debe ser un número",
      "number.min": "El precio no puede ser negativo",
      "any.required": "El precio es obligatorio",
    }),

  stock: Joi.number()
    .integer()
    .min(0)
    .default(0)
    .messages({
      "number.base": "El stock debe ser un número entero",
      "number.min": "El stock no puede ser negativo",
    }),

  category: Joi.string()
    .max(50)
    .allow("")
    .messages({
      "string.max": "La categoría no puede superar los 50 caracteres",
    }),

  image: Joi.string()
    .uri()
    .allow("")
    .messages({
      "string.uri": "La imagen debe ser una URL válida",
    }),

  active: Joi.boolean().default(true),
});

const createProductHandler = async (req, res) => {

  try {
    const { error } = productSchema.validate(req.body);
    if (error) res.status(404).send(error.details[0].message);

    const { name, description, price, stock, category, image } = req.body;
    const response = await createProductController(name, description, price, stock, category, image);

    res.status(201).send(response);

  } catch (error) {
    res.status(404).send({ Error: error.message });
  };
};

// Todos o por `Nombre`
const getAllProductHandler = async (req, res) => {
  try {
    const { name } = req.query;
    if (name) {
      const response = await getProductByNameController(name);
      res.status(200).send(response);
    } else {
      const response = await getAllProductController();
      res.status(200).send(response);
    };
  } catch (error) {
    res.status(404).send({ Error: error.message });
  };
};

const getOneProductByIdHandler = async (req, res) => {

  try {
    const { id } = req.params;
    const response = await getOneProductByIdController(id);
    res.status(200).send(response);

  } catch (error) {
    res.status(404).send({ Error: error.message });
  };
};

const updateProductHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, stock, category, image } = req.body;
    const response = await updateProductController(id, name, description, price, stock, category, image);

    res.status(200).send(response);

  } catch (error) {
    res.status(404).send({ Error: error.message });
  };
};

const deleteProductHandler = async (req, res) => {

  try {
    const { id } = req.params;
    const response = await deleteProductController(id);

    res.status(200).send(response);

  } catch (error) {
    res.status(404).send({ Error: error.message });
  };
};

module.exports = {
  createProductHandler,
  getAllProductHandler,
  getOneProductByIdHandler,
  updateProductHandler,
  deleteProductHandler
}