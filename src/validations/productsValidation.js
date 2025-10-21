const Joi = require('joi');

const productSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(50)
    .required()
    .messages({
      "string.empty": "El nombre es obligatorio",
      "string.min": "El nombre debe tener al menos 2 caracteres",
      "string.max": "El nombre no puede superar los 50 caracteres",
    }),

  description: Joi.string()
    .max(150)
    .allow("")
    .messages({
      "string.max": "La descripción no puede superar los 150 caracteres",
    }),

  price: Joi.number()
    .min(0)
    .required()
    .messages({
      "number.base": "El precio debe ser un número",
      "number.min": "El precio no puede ser negativo",
      "any.required": "El precio es obligatorio",
    }),

  stock: Joi.number()
    .integer()
    .min(0)
    .default(0)
    .messages({
      "number.base": "El stock debe ser un número entero",
      "number.min": "El stock no puede ser negativo",
    }),

  categoryId: Joi.number()
    .integer()
    .positive()
    .required()
    .messages({
      'number.base': 'El categoryId debe ser un número',
      'number.integer': 'El categoryId debe ser un número entero',
      'number.positive': 'El categoryId debe ser mayor que 0',
      'any.required': 'El categoryId es obligatorio'
    }),
    
  image: Joi.string()
    .uri()
    .allow("")
    .messages({
      "string.uri": "La imagen debe ser una URL válida",
    }),

  isActive: Joi.boolean().default(true),
});

module.exports = { productSchema };