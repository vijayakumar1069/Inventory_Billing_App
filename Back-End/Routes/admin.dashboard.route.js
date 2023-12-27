const express=require("express");
const router=express.Router();
const verifyAdmin=require("../Utils/verifyAdmin.js");
const { getdashboarddetails } = require("../Controller/admin.dashboard.controller.js");
router.get("/getdashboarddetails",getdashboarddetails)
module.exports = router;