const { createUserController, getAllUsersController, getUsersByNameController, getOneUserByIdController, updateUserController, deleteUserController } = require("../controllers/usersControllers");

//Validación de Joi 
const { userSchema } = require("../validations/userValidation.js");

const createUserHandler = async (req, res) => {
  try {

    const { error } = userSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const { name, username, email, password, phone, role } = req.body;
    const response = await createUserController(name, username, email, password, phone, role);

    return res.status(201).json(response);

  } catch (error) {
    if (error.message === "Usuario ya registrado") {
      return res.status(409).json({ message: error.message });
    }
    // if (error.message === "Los datos están incompletos") {
    //   return res.status(400).json({ message: error.message });
    // }
    console.error("Error en createUserHandler:", error);
    return res.status(500).json({ message: "Internal server error" });
  };
};

const getAllUserHandler = async (req, res) => {
  try {

    const { name } = req.query;
    if (name) {
      const response = await getUsersByNameController(name);
      return res.status(200).json(response);

    } else {
      const response = await getAllUsersController();
      return res.status(200).json(response);
    };

  } catch (error) {
    if (error.message === "No hay Usuarios") {
      return res.status(404).json({ message: error.message });
    }
    if (error.message === "No se encontró al usuario") {
      return res.status(404).json({ message: error.message });
    }
    console.error("Error en getAllUserHandler:", error);
    return res.status(500).json({ message: "Internal server error" });
  };
};

const getOneUserHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await getOneUserByIdController(id);
    return res.status(200).json(response);

  } catch (error) {
    if (error.message === "No se encontró el usuario con ese ID") {
      return res.status(404).json({ message: error.message });
    }
    console.error("Error en getOneUserHandler:", error);
    return res.status(500).json({ message: "Internal server error" });
  };
};

const updateUserHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, username, email, phone } = req.body;
    const response = await updateUserController(id, name, username, email, phone);

    return res.status(200).json(response);

  } catch (error) {
    if (error.message === "Usuario no encontrado") {
      return res.status(404).json({ message: error.message });
    }
    console.error("Error en updateUserHandler:", error);
    return res.status(500).json({ message: "Internal server error" });
  };
};

const deleteUserHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await deleteUserController(id);

    return res.status(200).json(response);

  } catch (error) {
    if (error.message === "Usuario no encontrado") {
      return res.status(404).json({ message: error.message });
    }
    console.error("Error en deleteUserHandler:", error);
    return res.status(500).json({ message: "Internal server error" });
  };
};

module.exports = {
  getAllUserHandler,
  getOneUserHandler,
  createUserHandler,
  updateUserHandler,
  deleteUserHandler,
};