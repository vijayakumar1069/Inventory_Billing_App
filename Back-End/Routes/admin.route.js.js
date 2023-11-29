const express = require('express');
const { signupRouter, loginRouter,updateRouter } = require('../Controller/admin.controller');
const verifyAdmin =require("../Utils/verifyAdmin.js")
const router=express.Router();

router.post("/signup",signupRouter)
router.post("/login",loginRouter)
router.post("/update/:id",verifyAdmin,updateRouter)


module.exports = router;