
const Joi = require('@hapi/joi')

const registerValidation = data => {
  const schema = {
    email: Joi.string()
      .required()
      .email(),
  };
  return Joi.validate(data, schema)

};

module.exports.registerValidation = registerValidation