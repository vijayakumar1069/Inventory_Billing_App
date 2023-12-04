const express = require("express");
const router = express.Router();
const {
  addCustomer,
  getallcustomer,
  editcustomer,
  updatecustomer,
  deletecustomer,
} = require("../Controller/customer.controller.js");
const verifyAdmin = require("../Utils/verifyAdmin.js");

router.post("/addcustomer", verifyAdmin, addCustomer);
router.get("/getallcustomer/:id", verifyAdmin, getallcustomer);
router.get("/editcustomer/:id", verifyAdmin, editcustomer);
router.post("/updatecustomer/:id", verifyAdmin, updatecustomer);
router.delete("/deletecustomer/:id", verifyAdmin, deletecustomer);

module.exports = router;
