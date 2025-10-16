const { registerController, loginController } = require("../controllers/authControllers");
//Validación de Joi 
const { userSchema } = require("../validations/userValidation.js");

const registerHandler = async (req, res) => {
  try {

    const { error } = userSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const { name, username, gender, email, password, phone, isActive, role } = req.body;
    const response = await registerController({ name, username, gender, email, password, phone, isActive, role });

    return res.status(201).json(response);

  } catch (error) {
    if (error.message === "Usuario ya registrado") {
      return res.status(409).json({ message: error.message });
    }
    console.error("Error en registerHandler:", error);
    return res.status(500).json({ message: "Internal server error" });
  };
};

const loginHandler = async (req, res) => {

  try {
    const { email, password } = req.body;
    const response = await loginController(email, password);

    return res.status(200).json(response);

  } catch (error) {
    if (error.message === "Usuario no registrado") {
      return res.status(404).json({ message: error.message });
    }
    if (error.message === "Contraseña incorrecta") {
      return res.status(401).json({ message: error.message });
    }

    console.error("Error en loginHandler:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  registerHandler,
  loginHandler
}