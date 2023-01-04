const authService = require("./../service/auth.service");
const { messages, status } = require("./../configs");
const Response = require("../responses/responses");

class AuthController {}

AuthController.prototype.registerUser = async (req, res, next) => {
  try {
    let data = await authService.registerUser(req.body);

    if (data == "user already exist") {
      return Response.errors(
        req,
        res,
        status.HTTP_BAD_REQUEST,
        messages.emailExist
      );
    }
    return Response.success(
      req,
      res,
      status.HTTP_OK,
      messages.registerSuccessful
    );
  } catch (error) {
    next({
      status: status.HTTP_INTERNAL_SERVER_ERROR,
      message: JSON.stringify({ message: error.message, stack: error.stack }),
    });
  }
};

AuthController.prototype.loginUser = async (req, res, next) => {
  try {
    let data = await authService.loginUser(req, res, req.body);
    return Response.success(
      req,
      res,
      status.HTTP_OK,
      data,
      messages.loginSuccessful
    );
  } catch (error) {
    next({
      status: status.HTTP_INTERNAL_SERVER_ERROR,
      message: JSON.stringify({ message: error.message, stack: error.stack }),
    });
  }
};

AuthController.prototype.registerAdmin = async (req, res, next) => {
  try {
    let data = await authService.registerAdmin(req.body);
    if (data == "user already exist") {
      return Response.errors(
        req,
        res,
        status.HTTP_BAD_REQUEST,
        messages.emailExist
      );
    }
    return Response.success(
      req,
      res,
      status.HTTP_OK,
      messages.adminRegisterSuccessful
    );
  } catch (error) {
    next({
      status: status.HTTP_INTERNAL_SERVER_ERROR,
      message: JSON.stringify({ message: error.message, stack: error.stack }),
    });
  }
};

AuthController.prototype.loginAdmin = async (req, res, next) => {
  try {
    let data = await authService.loginAdmin(req, res, req.body);
    return Response.success(
      req,
      res,
      status.HTTP_OK,
      data,
      messages.adminLoginSuccessful
    );
  } catch (error) {
    next({
      status: status.HTTP_INTERNAL_SERVER_ERROR,
      message: JSON.stringify({ message: error.message, stack: error.stack }),
    });
  }
};

module.exports = new AuthController();
