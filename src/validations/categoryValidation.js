const Joi = require('joi');

const categorySchema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(50)
    .required()
    .messages({
      'string.base': 'El nombre de la categoría debe ser un texto',
      'string.empty': 'El nombre de la categoría no puede estar vacío',
      'string.min': 'El nombre de la categoría debe tener al menos 2 caracteres',
      'string.max': 'El nombre de la categoría no puede superar los 50 caracteres',
      'any.required': 'El nombre de la categoría es obligatorio'
    })
});

module.exports = categorySchema;