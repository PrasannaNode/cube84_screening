require("dotenv").config();

const jwt = require("jsonwebtoken");
const Response = require("../responses/responses");

const { auth, userroles } = require("../database/models/index");

// authenticate
function authenticate() {
  const methods = {
    getDecodedToken: async (token) => {
      return await jwt.verify(token, process.env.JWT_SECRET);
    },
    verifyToken: async (token) => {
      try {
        let decoded = await jwt.verify(token, process.env.JWT_SECRET);
        let userData = "";
        let payload = {};
        if (decoded.id) {
          userData = await auth.findByPk(decoded.id);
          payload = {
            ...decoded,
          };
        }
        if (userData) {
          return {
            status: true,
            data: userData,
          };
        } else {
          return {
            status: false,
            erroType: "userNotFound",
          };
        }
      } catch (err) {
        if (err.name === "TokenExpiredError")
          return {
            status: false,
            erroType: "TokenExpiredError",
          };
        else if (err.name === "JsonWebTokenError")
          return {
            status: false,
            erroType: "TokenExpiredError",
          };
        else
          return {
            status: false,
            erroType: "TokenExpiredError",
          };
      }
    },
  };

  // return Object freeze
  return Object.freeze(methods);
}

// exporting the modules
module.exports = authenticate();
