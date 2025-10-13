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

module.exports = { userSchema };
