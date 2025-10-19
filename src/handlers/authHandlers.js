const { registerController, loginController } = require("../controllers/authControllers");

//Validación de Joi 
const { userSchema } = require("../validations/userValidation.js");

const registerHandler = async (req, res, next) => {
  try {

    const { err } = userSchema.validate(req.body);
    if (err) {
      const err = new Error(err.details[0].message);
      err.status = 400;
      err.name = "ValidationError";
      throw err;
    }

    const { name, username, gender, email, password, phone, isActive, role } = req.body;
    const response = await registerController({ name, username, gender, email, password, phone, isActive, role });

    return res.status(201).json(response);

  } catch (err) {
    next(err);
  };
};

const loginHandler = async (req, res, next) => {

  try {
    const { email, password } = req.body;
    const response = await loginController(email, password);

    return res.status(200).json(response);

  } catch (err) {
    next(err);
  };
};

module.exports = {
  registerHandler,
  loginHandler
}