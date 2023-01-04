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
    if (checkToken.status == false) {
      return Response.errors(
        req,
        res,
        status.HTTP_BAD_REQUEST,
        messages.tokenExpired
      );
    }

    if (checkToken.status === true) {
      req.user = checkToken.data;
      next();
    }
  } catch (e) {
    console.log(e);
    next({ status: status.HTTP_INTERNAL_SERVER_ERROR });
  }
};
