const Joi = require('joi');
const { validate: isUuid } = require('uuid');

const cartSchema = Joi.object({
  // cantidad: Joi.number()
  //   .integer()
  //   .min(1)
  //   .required()
  //   .messages({
  //     'number.base': 'La cantidad debe ser un número',
  //     'number.integer': 'La cantidad debe ser un número entero',
  //     'number.min': 'La cantidad mínima es 1',
  //     'any.required': 'La cantidad es requerida',
  //   }),

  // isActive: Joi.boolean()
  //   .optional()
  //   .messages({
  //     'boolean.base': 'isActive debe ser verdadero o falso',
  //   }),

  userId: Joi.string()
    .custom((value, helpers) => {
      if (!isUuid(value)) return helpers.error('any.invalid');
      return value;
    }, 'UUID validation')
    .required()
    .messages({
      'any.invalid': 'userId debe ser un UUID válido',
      'any.required': 'userId es requerido',
    }),

  // productId: Joi.string()
  //   .custom((value, helpers) => {
  //     if (!isUuid(value)) return helpers.error('any.invalid');
  //     return value;
  //   }, 'UUID validation')
  //   .required()
  //   .messages({
  //     'any.invalid': 'productId debe ser un UUID válido',
  //     'any.required': 'productId es requerido',
  //   }),
});

module.exports = cartSchema;