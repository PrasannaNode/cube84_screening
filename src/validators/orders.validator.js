const Joi = require("joi");
const _ = require("lodash");
const { messages, status, StatusCodes } = require("../configs");
const Response = require("../responses/responses");

// add Joi schema
const schemas = {
  createOrder: Joi.object().keys({
    products: Joi.array().required(),
    addressLine1: Joi.string().required(),
    addressLine2: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
  }),

  updateOrder: Joi.object().keys({
    products: Joi.array().required(),
    orderId: Joi.number().required(),
  }),

  cancelOrder: Joi.object().keys({
    orderId: Joi.number().required(),
  }),
};

const options = {
  // generic option
  basic: {
    abortEarly: false,
    convert: true,
    allowUnknown: false,
    stripUnknown: true,
  },
  // Options for Array of array
  array: {
    abortEarly: false,
    convert: true,
    allowUnknown: true,
    stripUnknown: {
      objects: true,
    },
  },
};

module.exports = {
  // exports validate admin signin
  createOrderValidation: (req, res, next) => {
    // getting the schemas
    let schema = schemas.createOrder;
    let option = options.basic;

    // validating the schema
    var { error, value } = schema.validate(req.body, option);

    if (!_.isEmpty(value)) {
      next();
    }
    if (!_.isEmpty(error)) {
      // returning the response
      Response.joierrors(req, res, error);
    }
  },

  updateOrderValidation: (req, res, next) => {
    // getting the schemas
    let schema = schemas.updateOrder;
    let option = options.basic;

    // validating the schema
    var { error, value } = schema.validate(req.body, option);

    if (!_.isEmpty(value)) {
      next();
    }
    if (!_.isEmpty(error)) {
      // returning the response
      Response.joierrors(req, res, error);
    }
  },

  cancelOrderValidation: (req, res, next) => {
    // getting the schemas
    let schema = schemas.cancelOrder;
    let option = options.basic;

    // validating the schema
    var { error, value } = schema.validate(req.body, option);

    if (!_.isEmpty(value)) {
      next();
    }
    if (!_.isEmpty(error)) {
      // returning the response
      Response.joierrors(req, res, error);
    }
  },
};
