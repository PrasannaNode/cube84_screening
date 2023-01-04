const Joi = require("joi");
const _ = require('lodash');
const { messages, status, StatusCodes } = require("../configs");
const Response = require('../responses/responses')

// add Joi schema 
const schemas = {
 
  adminRegister: Joi.object().keys({
    userName: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    mobileNumber: Joi.string().required(),
  }),

  userRegister: Joi.object().keys({
    userName: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    mobileNumber: Joi.string().required(),
  }),

  loginUser: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required()
  }),

  loginAdmin: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required()
  }),

  
};

const options = {
  // generic option
  basic: {
    abortEarly: false,
    convert: true,
    allowUnknown: false,
    stripUnknown: true
  },
  // Options for Array of array
  array: {
    abortEarly: false,
    convert: true,
    allowUnknown: true,
    stripUnknown: {
      objects: true
    }
  }
};

module.exports = {
  // exports validate admin signin 
  adminRegisterValidation: (req, res, next) => {
    // getting the schemas 
    let schema = schemas.adminRegister;
    let option = options.basic;

    // validating the schema 
    var { error, value } = schema.validate(req.body, option);

    if(!_.isEmpty(value)){
      next()
    }
    if(!_.isEmpty(error)){
      // returning the response 
      Response.joierrors(req, res, error)
    }
  },

  userRegisterValidation: (req, res, next) => {
    // getting the schemas 
    let schema = schemas.userRegister;
    let option = options.basic;

    // validating the schema 
    var { error, value } = schema.validate(req.body, option);

    if(!_.isEmpty(value)){
      next()
    }
    if(!_.isEmpty(error)){
      // returning the response 
      Response.joierrors(req, res, error)
    }
  },

  loginUserValidation: (req, res, next) => {
    // getting the schemas 
    let schema = schemas.loginUser;
    let option = options.basic;

    // validating the schema 
    var { error, value } = schema.validate(req.body, option);

    if(!_.isEmpty(value)){
      next()
    }
    if(!_.isEmpty(error)){
      // returning the response 
      Response.joierrors(req, res, error)
    }
  },

  loginAdminValidation: (req, res, next) => {
    // getting the schemas 
    let schema = schemas.loginAdmin;
    let option = options.basic;

    // validating the schema 
    var { error, value } = schema.validate(req.body, option);

    if(!_.isEmpty(value)){
      next()
    }
    if(!_.isEmpty(error)){
      // returning the response 
      Response.joierrors(req, res, error)
    }
  },

  
}
