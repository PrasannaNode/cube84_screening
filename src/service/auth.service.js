const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { auth } = require("../database/models/index");

class AuthService {}

AuthService.prototype.registerUser = async (body) => {
  try {
    //check user exist
    let findUser = await auth.findOne({
      where: {
        email: body.email,
      },
    });
    if (findUser) {
      return "user already exist";
    }

    const user = await auth.create({
      userName: body.userName,
      email: body.email,
      password: bcrypt.hashSync(body.password, 8),
      mobileNumber: body.mobileNumber,
      role: 1,
    });

    return user;
  } catch (error) {
    throw new Error(error);
  }
};

AuthService.prototype.loginUser = async (req, res, body) => {
  try {
    //check user exist
    let findUser = await auth.findOne({
      where: {
        email: body.email,
      },
    });
    if (!findUser) {
      return res.status(401).send({
        accessToken: null,
        message: "User not exist",
      });
    }

    //check password
    var passwordIsValid = bcrypt.compareSync(body.password, findUser.password);

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!",
      });
    }

    var token = jwt.sign({ id: findUser.id }, process.env.JWT_SECRET, {
      expiresIn: 86400, // 24 hours
    });

    return {
      id: findUser.id,
      userName: findUser.userName,
      email: findUser.email,
      roles: findUser.role,
      accessToken: token,
    };
  } catch (error) {
    throw new Error(error);
  }
};

AuthService.prototype.registerAdmin = async (body) => {
  try {
    //check user exist
    let findUser = await auth.findOne({
      where: {
        email: body.email,
      },
    });
    if (findUser) {
      return "user already exist";
    }
    const user = await auth.create({
      userName: body.userName,
      email: body.email,
      password: bcrypt.hashSync(body.password, 8),
      mobileNumber: body.mobileNumber,
      role: 2,
    });
    return user;
  } catch (error) {
    throw new Error(error);
  }
};

AuthService.prototype.loginAdmin = async (req, res, body) => {
  try {
    //check user exist
    let findUser = await auth.findOne({
      where: {
        email: body.email,
      },
    });
    if (!findUser) {
      return res.status(401).send({
        accessToken: null,
        message: "User not exist",
      });
    }

    //check password
    var passwordIsValid = bcrypt.compareSync(body.password, findUser.password);

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!",
      });
    }

    var token = jwt.sign({ id: findUser.id }, process.env.JWT_SECRET, {
      expiresIn: 86400, // 24 hours
    });

    return {
      id: findUser.id,
      userName: findUser.userName,
      email: findUser.email,
      roles: findUser.role,
      accessToken: token,
    };
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = new AuthService();
