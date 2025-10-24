/* =======================================================
 * Handlers de autenticación
 * =======================================================
 * - registerHandler: valida los datos del usuario con Joi,
 *   luego delega la creación al registerController y devuelve respuesta HTTP 201
 * - loginHandler: delega la autenticación al loginController
 *   y devuelve respuesta HTTP 200 con token y datos del usuario
*/
const { registerController, loginController } = require("../controllers/authControllers");
const { userSchema } = require("../validations/userValidation.js");

const registerHandler = async (req, res, next) => {
  try {

    // Validación de datos de usuario con Joi
    const { err } = userSchema.validate(req.body);
    if (err) {
      const err = new Error(err.details[0].message);
      err.status = 400;
      err.name = "ValidationError";
      throw err;
    }

    // Delegación al controller que maneja la creación en la DB
    const { name, username, gender, email, password, phone, isActive, role } = req.body;
    const response = await registerController({ name, username, gender, email, password, phone, isActive, role });

    return res.status(201).json(response);

  } catch (err) {
    next(err);
  };
};

const loginHandler = async (req, res, next) => {

  try {
    // Delegación al controller que valida credenciales y genera token
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