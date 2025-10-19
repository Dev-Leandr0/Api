const User = require('../models/User');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

const registerController = async (userData) => {

  const { name, username, gender, email, password, phone, isActive, role } = userData;

  const userExist = await User.findOne({ where: { email } });
  if (userExist) {
    const err = new Error("Usuario ya registrado");
    err.status = 409;
    throw err;
  };

  const newUser = await User.create({ name, username, gender, email, password, phone, isActive, role });

  return {
    message: "Usuario registrado exitosamente",
    user: newUser
  };
};

const loginController = async (email, password) => {

  const user = await User.findOne({ where: { email } });
  if (!user) {
    const err = new Error("Usuario no registrado");
    err.status = 404;
    throw err;
  };

  const passMatch = await bcrypt.compare(password, user.password);
  if (!passMatch) {
    const err = new Error("Contraseña incorrecta");
    err.status = 401;
    throw err;
  }

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );

  const { password: _, ...userWithoutPass } = user.get({ plain: true });
  return { message: "Inicio de sesión exitoso", user: userWithoutPass, token };
};

module.exports = {
  registerController,
  loginController
}