const express = require('express');
const { signupRouter, loginRouter } = require('../Controller/admin.controller');
const router=express.Router();

router.post("/signup",signupRouter)
router.post("/login",loginRouter)


module.exports = router;