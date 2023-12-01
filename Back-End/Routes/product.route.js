const express= require('express');
const verifyAdmin = require('../Utils/verifyAdmin');
const{addProduct,getProducts}=require("../Controller/product.controller.js")
const router=express.Router();
router.post("/addproduct/:id",verifyAdmin,addProduct)
router.get("/getproducts/:id",verifyAdmin,getProducts)



module.exports =router