const { createProductController, getOneProductByIdController, updateProductController, deleteProductController, getAllProductController, getProductByNameController } = require('../controllers/productsControllers');

const { productSchema } = require("../validations/productsValidation");

const createProductHandler = async (req, res) => {

  try {
    const { error } = productSchema.validate(req.body);
    if (error) res.status(404).send(error.details[0].message);

    const { name, description, price, stock, category, image } = req.body;
    const response = await createProductController(name, description, price, stock, category, image);

    return res.status(201).json(response);

  } catch (error) {
    if (error.message === "Producto ya Registrado") {
      return res.status(409).json({ message: error.message });
    }
    console.error("Error en createProductHandler:", error);
    return res.status(500).json({ message: "Internal server error" });
  };
};

// Todos o por `Nombre`
const getAllProductHandler = async (req, res) => {
  try {
    const { name } = req.query;
    if (name) {
      const response = await getProductByNameController(name);
      return res.status(200).json(response);
    } else {
      const response = await getAllProductController();
      return res.status(200).json(response);
    };

  } catch (error) {
    if (error.message === "No hay productos") {
      return res.status(409).json({ message: error.message });
    }
    if (error.message === "No se encontró el producto") {
      return res.status(409).json({ message: error.message });
    }
    console.error("Error en getAllProductHandler:", error);
    return res.status(500).json({ message: "Internal server error" });
  };
};

const getOneProductByIdHandler = async (req, res) => {

  try {
    const { id } = req.params;
    const response = await getOneProductByIdController(id);
    return res.status(200).json(response);

  } catch (error) {
    if (error.message === "No se encontró el producto con ese ID") {
      return res.status(409).json({ message: error.message });
    }
    console.error("Error en getOneProductByIdHandler:", error);
    return res.status(500).json({ message: "Internal server error" });
  };
};

const updateProductHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, stock, category, image } = req.body;
    const response = await updateProductController(id, name, description, price, stock, category, image);

    return res.status(200).json(response);

  } catch (error) {
    if (error.message === "Producto no encontrado") {
      return res.status(409).json({ message: error.message });
    }
    console.error("Error en updateProductHandler:", error);
    return res.status(500).json({ message: "Internal server error" });
  };
};

const deleteProductHandler = async (req, res) => {

  try {
    const { id } = req.params;
    const response = await deleteProductController(id);

    return res.status(200).json(response);

  } catch (error) {
    if (error.message === "Producto no encontrado") {
      return res.status(409).json({ message: error.message });
    }
    console.error("Error en deleteProductHandler:", error);
    return res.status(500).json({ message: "Internal server error" });
  };
};

module.exports = {
  createProductHandler,
  getAllProductHandler,
  getOneProductByIdHandler,
  updateProductHandler,
  deleteProductHandler
}