const express = require('express');
const router = express.Router();
const { createOrderValidation, updateOrderValidation,  cancelOrderValidation } = require('../../validators/orders.validator');

const { verifyUserToken, verifyAdminToken } = require("../../hooks");
const { orderController } = require('../../controllers/index');


router.post('/createOrder',createOrderValidation, verifyUserToken, orderController.createOrder);
router.put('/updateOrder',updateOrderValidation, verifyUserToken, orderController.updateOrder);
router.delete('/cancelOrder', cancelOrderValidation, verifyUserToken, orderController.cancelOrder);


module.exports = router;