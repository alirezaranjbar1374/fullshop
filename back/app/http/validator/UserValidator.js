const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const validateCreateUser = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
  });
  return schema.validate(data);
};
const validateLoginUser = (data) => {
  const schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string(),
  });
  return schema.validate(data);
};



module.exports = { validateCreateUser ,validateLoginUser};
