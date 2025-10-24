const User = require('../models/User');

/* =======================================================
 * CREATE: Controlador de crear usuario
 * =======================================================
 * Verifica que el email exista 
 * Si no existe, crea el usuario en la base de datos
 * El hash de la contraseña se aplica automáticamente mediante un hook en el modelo Sequelize
 * Devuelve un mensaje de confirmación y los datos del usuario creado
*/
const createUserController = async (userData) => {

  const { name, username, gender, email, password, phone, isActive, role } = userData;

  // Validación: verificar si el usuario ya existe [email]
  const userExist = await User.findOne({ where: { email } });
  if (userExist) {
    const err = new Error("Usuario ya registrado");
    err.status = 409;
    throw err;
  };

  /*  ===== Creación del usuario =====  */
  // Nota: El hash de la contraseña se aplica automáticamente en el hook del modelo
  const newUser = await User.create({ name, username, gender, email, password, phone, isActive, role });

  /* ===== Respuesta ===== */
  return {
    message: "Usuario creado exitosamente",
    user: newUser
  };
};


/* =======================================================
 * LECTURA: Controladores de lectura de usuarios
 * =======================================================
 * - getAllUsersController: recupera todos los usuarios registrados en la DB.  
 * - getUserByNameController: busca usuarios que coincidan con un nombre específico.  
 * - getUserByIdController: obtiene un usuario según su ID.  
 * - getUsersByStatusController: filtra usuarios por estado activo/inactivo (recibe booleano o string 'true'/'false').  
 * 
 * En todos los casos:
 * - Si no se encuentran resultados, se lanza un error 404 (Not Found).  
 * - Devuelven un mensaje de éxito junto con los datos encontrados.
*/
const getAllUsersController = async () => {

  const users = await User.findAll();

  // Validación: verificar si hay usuarios
  if (!users.length) {
    const err = new Error("No hay Usuarios");
    err.status = 404;
    throw err;
  };

  /* ===== Respuesta ===== */
  return {
    message: "Usuarios encontrados",
    users,
  };
};

const getUsersByNameController = async (name) => {

  const usersByName = await User.findAll({ where: { name } });
  // Validación: verificar si el usuario existe con ese nombre
  if (usersByName.length === 0) {
    const err = new Error(`No se encontró ningún usuario con ese nombre`);
    err.status = 404;
    throw err;
  };

  /* ===== Respuesta ===== */
  return {
    message: "Usuario encontrado",
    usersByName: usersByName,
  };
};

const getUserByIdController = async (id) => {

  const userById = await User.findByPk(id);
  // Validación: existencia por id
  if (!userById) {
    const err = new Error(`No se encontró el usuario con ese ID`);
    err.status = 404;
    throw err;
  }

  /* ===== Respuesta ===== */
  return {
    message: "Usuario encontrado",
    user: userById
  };
};

const getUsersByStatusController = async (isActive) => {

  // validación de string
  if (typeof isActive === 'string') {
    if (isActive !== 'true' && isActive !== 'false') {
      const err = new Error("El parámetro 'isActive' debe ser 'true' o 'false'");
      err.status = 400;
      throw err;
    }
    isActive = isActive === 'true'; // conversion de tipo
  };

  // console.log(`El valor de estado es: ${isActive ? 'activo' : 'inactivo'} (valor recibido: ${isActive})`);

  //filtrado por isActive
  const users = await User.findAll({
    where:
      { isActive }
  });
  if (users.length === 0) {
    const err = new Error(`No hay usuarios ${isActive ? 'activos' : 'inactivos'}`);
    err.status = 404;
    throw err;
  };

  /* ===== Respuesta ===== */
  return {
    message: `Usuarios ${isActive ? 'activos' : 'inactivos'} encontrados`,
    users
  };
};


/* =======================================================
 * UPDATE: Controlador de actualización de usuario
 * =======================================================
 * - Busca la usuario en la DB usando el ID proporcionado
 * - Si no se encuentra, lanza un error 404 indicando que no existe
 * - Actualiza los campos proporcionados [userData]
 * - Devuelve un mensaje de éxito junto con el usuario actualizada.
*/
const updateUserController = async (id, userData) => {

  const { name, username, gender, email, password, phone, isActive, role } = userData;

  // Validación: existencia por id
  const userById = await User.findByPk(id);
  if (!userById) {
    const err = new Error("Usuario no encontrado");
    err.status = 404;
    throw err;
  };

  //Preparación de los campos a actualizar
  const updatedFields = {
    name,
    username,
    gender,
    email,
    password,// El hash se aplica en el hook del modelo
    phone,
    isActive,
    role,
  };

  // Actualización en la DB
  const userUpdate = await userById.update(updatedFields);

  /* ===== Respuesta ===== */
  return {
    message: "Usuario actualizado",
    user: userUpdate,
  };
};

/* =======================================================
 * DELETE: Controladores de eliminación de usuarios
 * =======================================================
 * - deleteUserController: elimina físicamente un usuario de la DB  
 * - deleteSoftUserController: realiza un soft delete (marca el usuario como inactivo)
 * Ambas funciones validan la existencia del usuario y manejan errores con status code
*/

const deleteUserController = async (id) => {

  const deleteUser = await User.findByPk(id);
  // Validación: existencia del usuario por ID
  if (!deleteUser) {
    const err = new Error("Usuario no encontrado");
    err.status = 404;
    throw err;
  }

  //  Eliminación del usuario PERMANENTEMENTE
  await deleteUser.destroy();

  /* ===== Respuesta ===== */
  return {
    message: "Usuario eliminado",
    user: deleteUser
  };
};

const deleteSoftUserController = async (id) => {

  const user = await User.findByPk(id);
  // Validación: existencia del usuario por ID
  if (!user) {
    const err = new Error("Usuario no encontrado");
    err.status = 404;
    throw err;
  };

  // Validación: verificar si el usuario ya está inactivo
  if (!user.isActive) {
    const err = new Error("El Usuario ya se elimino");
    err.status = 400;
    throw err;
  };

  //  Eliminación del usuario LÓGICA
  user.isActive = false;
  await user.save();


  /* ===== Respuesta ===== */
  return {
    message: "Usuario eliminado (soft delete)",
    user
  };
};

module.exports = {
  // Crear
  createUserController,

  // Lectura
  getAllUsersController,
  getUserByIdController,
  getUsersByNameController,

  // Lectura por Estados
  getUsersByStatusController,

  // Update
  updateUserController,

  // Delete
  deleteUserController, // eliminación permanente
  deleteSoftUserController, // eliminación lógica
}