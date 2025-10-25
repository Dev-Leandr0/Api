const { userSchema } = require('../validations/userValidation');

const validateUserData = (data) => {
  const { error, value } = userSchema.validate(data, { stripUnknown: true });
  if (error) {
    const err = new Error(error.details[0].message);
    err.status = 409;
    err.name = "Validation";
    throw err;
  }
  return value;
};

module.exports = { validateUserData };
