const express = require("express");
const verifyAdmin = require("../Utils/verifyAdmin");
const { createInvoice,  getallInvoices } = require("../Controller/admin.invoice.controller");
const router = express.Router();
router.post("/createInvoice/", verifyAdmin, createInvoice);
router.get("/getAllInvoices", verifyAdmin, getallInvoices);

module.exports = router;
