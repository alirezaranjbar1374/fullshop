const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const validateCreateTeacher = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email:Joi.string().required(),
    date:Joi.string(),
    description: Joi.string().required(),
    pic: Joi.string().required(),


    adminUsername: Joi.string().required(),
    adminPassword: Joi.string().required(),

    
  });
  return schema.validate(data);
};
const validateUpdateTeacher = (data) => {
  const schema = Joi.object({
    name: Joi.string(),
    email:Joi.string(),
    pic: Joi.string().required(),
    description: Joi.string(),
    adminUsername: Joi.string(),
    adminPassword: Joi.string()
    
  });
  return schema.validate(data);
};

const loginValidator = (data) => {
  const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  });
  return schema.validate(data);
};

const CourseValidator = (data) => {
  const schema = Joi.object({

    name:Joi.string().required(),
    description:Joi.string().required(),
    timeCourse:Joi.number().required(),
    price:Joi.number().required(),
    teacherAdmin:Joi.string().required(),
    pic: Joi.string()
  
  });
  return schema.validate(data);
};


module.exports = { validateCreateTeacher,validateUpdateTeacher,loginValidator,CourseValidator };
