const express = require("express");
const verifyAdmin = require("../Utils/verifyAdmin");
const {
  createInvoice,
  getallInvoices,
  updateinvoice,
  getproductsforexistinginvoice,
  addproductstoexistinginvoice,
  updateexistinginvoice,
  deleteproductfrominvoice,
} = require("../Controller/admin.invoice.controller");
const router = express.Router();
router.post("/createInvoice/", verifyAdmin, createInvoice);
router.get("/getAllInvoices", verifyAdmin, getallInvoices);
router.get("/updateinvoice/:id", verifyAdmin, updateinvoice);
router.get(
  "/getproductsforexistinginvoice/:id",
  verifyAdmin,
  getproductsforexistinginvoice
);
router.post(
  "/addproductstoexistinginvoice/:id",
  verifyAdmin,
  addproductstoexistinginvoice
);
router.post("/updateexistinginvoice/:id", verifyAdmin, updateexistinginvoice);
router.delete(
  "/deleteproductfrominvoice/:id",
  verifyAdmin,
  deleteproductfrominvoice
);
module.exports = router;
