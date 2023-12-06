const express=require('express');
const verifyAdmin = require('../Utils/verifyAdmin');
const { createInvoice } = require('../Controller/admin.invoice.controller');
const router=express.Router();
router.post("/createInvoice/",verifyAdmin,createInvoice)


module.exports =router;