const express = require('express');
const { signupRouter } = require('../Controller/admin.controller');
const router=express.Router();

router.post("/signup",signupRouter)


module.exports = router;