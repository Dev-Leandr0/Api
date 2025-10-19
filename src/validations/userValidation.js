const Joi = require('joi');

const userSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(30)
    .required()
    .messages({
      'string.empty': 'El nombre es obligatorio.',
      'string.min': 'El nombre debe tener al menos 3 caracteres.',
      'string.max': 'El nombre no puede superar 30 caracteres.',
      'any.required': 'El nombre es obligatorio.'
    }),
  username: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required()
    .messages({
      'string.empty': 'El nombre de usuario es obligatorio.',
      'string.alphanum': 'El nombre de usuario solo puede contener letras y números.',
      'string.min': 'El nombre de usuario debe tener al menos 3 caracteres.',
      'string.max': 'El nombre de usuario no puede superar 30 caracteres.',
      'any.required': 'El nombre de usuario es obligatorio.'
    }),
  gender: Joi.string()
    .valid('male', 'female', 'other')
    .required()
    .messages({
      'string.empty': 'El género es obligatorio.',
      'any.required': 'El género es obligatorio.',
      'any.only': 'El género debe ser "male", "female" o "other".'
    }),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: true } })//{ allow: ['com', 'net'] }
    .pattern(new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'))
    .required()
    .messages({
      'string.base': 'El email debe ser un texto',
      'string.empty': 'El email no puede estar vacío',
      'string.email': 'El email debe ser válido',
      'string.pattern.base': 'El email no cumple con el formato permitido',
      'any.required': 'El email es obligatorio'
    }),
  password: Joi.string()
    .pattern(new RegExp(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[\W_]).{8,}$/))
    .required()
    .messages({
      'string.pattern.base': 'La contraseña debe tener al menos 8 caracteres, incluir mayúsculas, minúsculas, números y caracteres especiales.',
      'string.empty': 'La contraseña es obligatoria.',
      'any.required': 'La contraseña es obligatoria.'
    }),
  role: Joi.string()
    .valid('user', 'admin')
    .default('user'),
  phone: Joi.string()
    .pattern(/^[0-9]{7,15}$/)
    .allow('')
    .optional()
    .messages({
      'string.base': 'El teléfono debe ser un texto',
      'string.pattern.base': 'El teléfono debe contener entre 7 y 15 dígitos.'
    }),
  isActive: Joi.boolean()
    .default(true)
});

module.exports = { userSchema };
