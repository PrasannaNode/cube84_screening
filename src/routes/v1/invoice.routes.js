const express = require('express');
const router = express.Router();
const { getInvoiceValidation} = require('../../validators/invoice.validator');
const { invoiceController } = require('../../controllers/index');

router.get('/generateInvoice', getInvoiceValidation,  invoiceController.generateInvoice);



module.exports = router;