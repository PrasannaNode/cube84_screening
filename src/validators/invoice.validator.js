const Joi = require("joi");
const _ = require("lodash");
const { messages, status, StatusCodes } = require("../configs");
const Response = require("../responses/responses");

// add Joi schema
const schemas = {
  getInvoice: Joi.object().keys({
    orderId: Joi.number().required()
  })
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
  getInvoiceValidation: (req, res, next) => {
    // getting the schemas
    let schema = schemas.getInvoice;
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
  }
};
