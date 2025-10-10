const { createUserController, getAllUsersController, getUsersByNameController, getOneUserByIdController, updateUserController, deleteUserController } = require("../controllers/usersControllers");

const Joi = require('joi');
const userSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(30)
    .required(),
  username: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
  password: Joi.string()
    .pattern(new RegExp(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[\W_]).{8,}$/))
    .required(),
  role: Joi.string()
    .valid('user', 'admin'),
  phone: Joi.string()
    .pattern(/^[0-9]{7,15}$/)
    .optional(),
  isActive: Joi.boolean()
    .default(true)
});

const createUserHandler = async (req, res) => {
  try {

    const { error } = userSchema.validate(req.body);
    if (error) res.status(404).send(error.details[0].message);

    const { name, username, email, password, phone, role } = req.body;
    const response = await createUserController(name, username, email, password, phone, role);

    res.status(201).send(response);

  } catch (error) {
    res.status(404).send({ Error: error.message });
  };
};

const getAllUserHandler = async (req, res) => {
  try {

    const { name } = req.query;
    if (name) {
      const response = await getUsersByNameController(name);
      res.status(200).send(response);

    } else {
      const response = await getAllUsersController();
      res.status(200).send(response);
    };

  } catch (error) {
    res.status(404).send({ Error: error.message });
  };
};

const getOneUserHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await getOneUserByIdController(id);
    res.status(200).send(response);

  } catch (error) {
    res.status(404).send({ Error: error.message });
  };
};

const updateUserHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, username, email, phone } = req.body;
    const response = await updateUserController(id, name, username, email, phone);

    res.status(200).send(response);

  } catch (error) {
    res.status(404).send({ Error: error.message });
  }
};

const deleteUserHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await deleteUserController(id);

    res.status(200).send(response);

  } catch (error) {
    res.status(404).send({ Error: error.message });
  };
};

module.exports = {
  getAllUserHandler,
  getOneUserHandler,
  createUserHandler,
  updateUserHandler,
  deleteUserHandler,
};