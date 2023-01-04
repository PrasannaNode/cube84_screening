const express = require('express');
const router = express.Router();
const { getProductValidation } = require('../../validators/product.validator');

const { verifyUserToken, verifyAdminToken } = require("../../hooks");
const { productController } = require('../../controllers/index');

const { uploadFileOnUploadsFolder } = require('../../utils/uploadFiles');

router.post('/addProduct',verifyAdminToken,uploadFileOnUploadsFolder, productController.addProduct);
router.get('/getProduct',verifyUserToken, productController.getProduct);


module.exports = router;