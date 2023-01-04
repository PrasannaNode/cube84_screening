const { messages, status } = require("../configs");
const Response = require("../responses/responses");

const authenticate = require("../utils/authenticate");

// exporting the hooks
module.exports = async (req, res, next) => {
  try {
    let token;
    if (req.headers.authorization) {
      token = req.headers.authorization.replace("Bearer", "");
    } else {
      token = req.headers["x-access-token"];
    }

    if (!token) {
      return Response.errors(
        req,
        res,
        status.HTTP_BAD_REQUEST,
        messages.invalidToken
      );
    }

    let checkToken = await authenticate.verifyToken(token);

    if (checkToken.status === true) {
      req.user = checkToken.data;

      if (checkToken.data.role != 2) {
        return Response.errors(
          req,
          res,
          status.HTTP_UNAUTHORIZED,
          messages.unAuthorized,
          null
        );
      }

      next();
    } else {
      Response.errors(
        req,
        res,
        status.HTTP_UNAUTHORIZED,
        messages.unAuthorized
      );
    }
  } catch (e) {
    console.log(e);
    next({ status: status.HTTP_INTERNAL_SERVER_ERROR });
  }
};
