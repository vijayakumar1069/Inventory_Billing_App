const express= require('express');
const verifyAdmin = require('../Utils/verifyAdmin');
const{addProduct}=require("../Controller/product.controller.js")
const router=express.Router();
router.post("/addproduct/:id",verifyAdmin,addProduct)



module.exports =router