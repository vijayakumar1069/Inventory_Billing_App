const express = require("express");
const verifyAdmin = require("../Utils/verifyAdmin");
const { createInvoice,  getallInvoices, updateinvoice } = require("../Controller/admin.invoice.controller");
const router = express.Router();
router.post("/createInvoice/", verifyAdmin, createInvoice);
router.get("/getAllInvoices", verifyAdmin, getallInvoices);
router.get("/updateinvoice/:id",verifyAdmin,updateinvoice);

module.exports = router;
