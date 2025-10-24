const { createUserController, getAllUsersController, getUserByIdController, getUsersByNameController, getUsersByStatusController, updateUserController, deleteUserController, deleteSoftUserController } = require("../controllers/usersControllers");
const { userSchema } = require("../validations/userValidation.js");

/* --- Crear --- */
const createUserHandler = async (req, res, next) => {
  try {

    const { error } = userSchema.validate(req.body);
    if (error) {
      const error = new Error(error.details[0].message);
      error.status = 409;
      error.name = "Validation";
      throw error;
    }

    const { name, username, gender, email, password, phone, isActive, role } = req.body;
    const response = await createUserController({ name, username, gender, email, password, phone, isActive, role });

    return res.status(201).json(response);

  } catch (error) {
    next(error);
  };
};

/* --- Lectura --- */
const getAllUsersHandler = async (req, res, next) => {
  try {
    const response = await getAllUsersController();
    return res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

const getUserByIdHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await getUserByIdController(id);
    return res.status(200).json(response);

  } catch (err) {
    next(err);
  };
};

const getUsersByNameHandler = async (req, res, next) => {

  try {
    const { name } = req.query;
    const response = await getUsersByNameController(name);
    return res.status(200).json(response);
  } catch (err) {
    next(err);
  }

};

/*--- Estados --- */
const getUsersByStatusHandler = async (req, res, next) => {
  try {

    const { isActive } = req.query;

    const response = await getUsersByStatusController(isActive);

    return res.status(200).json(response);

  } catch (err) {
    next(err);
  };
};

/*--- Update --- */
const updateUserHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, username, gender, email, password, phone, isActive, role } = req.body;

    const response = await updateUserController(id, { name, username, gender, email, password, phone, isActive, role });

    return res.status(200).json(response);

  } catch (err) {
    next(err);
  };
};

/* --- Delete --- */
const deleteUserHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await deleteUserController(id);

    return res.status(200).json(response);

  } catch (err) {
    next(err);
  };
};

const deleteSoftUserHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await deleteSoftUserController(id);

    return res.status(200).json(response);

  } catch (err) {
    next(err);
  };
};


module.exports = {
  // Crear
  createUserHandler,
  //Lectura
  getAllUsersHandler,
  getUserByIdHandler,
  getUsersByNameHandler,
  //Estado
  getUsersByStatusHandler,
  // Update
  updateUserHandler,
  // Delete
  deleteUserHandler,
  deleteSoftUserHandler,
};