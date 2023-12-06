const express=require('express');
const mongoose=require('mongoose');
const PRODUCT=require("../Models/admin.products.js")
const CUSTOMER=require("../Models/admin.customer.js")
const ADMIN=require("../Models/admin.model.js")

const createInvoice=async(req,res,next)=>
{
    console.log(req.body.prevProducts[0])
    res.status(200).json({message:req.body})
}

module.exports ={ createInvoice}