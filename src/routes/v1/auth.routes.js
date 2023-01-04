const express = require('express');
const router = express.Router();
const { adminRegisterValidation ,loginUserValidation , userRegisterValidation , loginAdminValidation } = require('../../validators/auth.validator');

const { verifyUserToken, verifyAdminToken } = require("../../hooks");
const { authController } = require('../../controllers/index');

router.post('/registerUser',userRegisterValidation, authController.registerUser);
router.post('/loginUser',loginUserValidation, authController.loginUser);
router.post('/registerAdmin',adminRegisterValidation, authController.registerAdmin);
router.post('/loginAdmin', loginAdminValidation, authController.loginAdmin);


module.exports = router;