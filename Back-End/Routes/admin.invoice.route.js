const express = require("express");
const verifyAdmin = require("../Utils/verifyAdmin");
const { createInvoice, getAllInvoices } = require("../Controller/admin.invoice.controller");
const router = express.Router();
router.post("/createInvoice/", verifyAdmin, createInvoice);
router.get("/getAllInvoices", verifyAdmin, getAllInvoices);

module.exports = router;
