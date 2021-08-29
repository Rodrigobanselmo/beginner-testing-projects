const express = require('express')
const router = express.Router();
const apiExcel = require("./api/excel/excel-generator")
const apiMailer = require("./api/mail/mail-generator")
const apiCNPJ = require("./api/cnpj/cnpj-consult")

router.use('/excel', apiExcel) 
router.use('/mail', apiMailer) 
router.use('/cnpj', apiCNPJ) 

module.exports=router;