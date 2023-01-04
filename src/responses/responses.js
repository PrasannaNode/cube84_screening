const responseStatus = require('../configs/httpCodes')

// response class 
class Response {
  // triggering a success response 

  success(req, res, status, data = null, message = 'success') {

    return res.status(status).json({
      status,
      message,
      data
    });
  }
  // triggering a error response 
  errors(req, res, status, message, data) {
    // req.appLogger.error(`URL : ${req.protocol}://${req.get('host')}${req.originalUrl} | Request : ${JSON.stringify(req.value ? req.value : {})} | Error : ${message}`)

    return res.status(status).json({
      status,
      message,
      data
    });
  }

  // triggering a error response 
  errorsWithOutReq(status, message) {
    // req.appLogger.error(`Error : ${message}`)
    message = 'Internel server error!'
    return res.status(status).json({
      status,
      message
    });
  }
  // triggering a joi error response  
  joierrors(req, res, err) {
    let message;
    let error = err.details.reduce((prev, curr) => {
      let key = curr.path[0] || 'value'
      prev[key] = curr.message.replace(/"/g, '');
      message = prev[key];
      return prev;
    }, {});

    // let message = "Bad Request";

    // let status = responseStatus.HTTP_BAD_REQUEST;
    // req.appLogger.error(`URL : ${req.protocol}://${req.get('host')}${req.originalUrl} | Request : ${JSON.stringify(req.value ? req.value : {})} | BadRequestError : ${JSON.stringify(error)}`)

    let status = responseStatus.HTTP_OK;
    return res.status(status).json({
      status,
      message,
      error
    });
  }
  joicustomerrors(req, res, err) {

    let error = err.details.reduce((prev, curr) => {
      // prev[curr.path[0]] = curr.message.replace(/"/g, '');
      return curr.message.replace(/"/g, '');
    }, {});
    let message = error //messageTypes.joiValidation.badRequest;
    let status = status.HTTP_BAD_REQUEST;
    // req.appLogger.error(`URL : ${req.protocol}://${req.get('host')}${req.originalUrl} | Request : ${JSON.stringify(req.value ? req.value : {})} | BadRequestError : ${JSON.stringify(error)}`)

    return res.status(status).json({
      status,
      message,
      error
    });
  }

}

// exporting the module 
module.exports = new Response();
