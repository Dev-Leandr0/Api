const User = require('../models/User');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

const registerController = async (name, username, email, password, phone, role) => {

  const userExist = await User.findOne({ email })
  if (userExist) {
    throw new Error("Usuario ya registrado");
  };

  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ name, username, email, password: hashPassword, phone, role });

  await newUser.save();
  return newUser;
};

const loginController = async (email, password) => {

  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Usuario no registrado");
  };

  const passMatch = await bcrypt.compare(password, user.password);
  if (!passMatch) {
    throw new Error("Contraseña incorrecta");
  };

  const token = jwt.sign(
    { id: user.id, role: user.role },
    'MySecretKey',
    { expiresIn: '1h' }
  )
  console.log(token);

  const { password: _, ...userWithoutPass } = user;
  return { message: "Inicio de sesion exitoso", user: userWithoutPass, token };
};

module.exports = {
  registerController,
  loginController
}