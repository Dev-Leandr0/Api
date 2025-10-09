const { registerController, loginController } = require("../controllers/authControllers");

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

const registerHandler = async (req, res) => {
  try {

    const { error } = userSchema.validate(req.body);
    if (error) res.status(404).send(error.details[0].message);

    const { name, username, email, password, phone, role } = req.body;
    const response = await registerController(name, username, email, password, phone, role);

    res.status(201).send(response);

  } catch (error) {
    res.status(404).send({ Error: error.message });
  };
};

const loginHandler = async (req, res) => {

  const { email, password } = req.body;
  const response = await loginController(email, password);

  res.status(200).send(response);
};

module.exports = {
  registerHandler,
  loginHandler
}