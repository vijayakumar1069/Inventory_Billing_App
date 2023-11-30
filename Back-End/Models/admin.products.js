const mongoose = require("mongoose");


const productSchema = new mongoose.Schema({
  productID: {
    type: Number,
    required: true,
  },
  productname: { type: String, required: true },
  productdescription: { type: String, required: true },
  productcategory: { type: String, required: true },
  productquantity: { type: Number, required: true },
  productprice: { type: Number, required: true },
  
},
{
  timestamps:true
});
const PRODUCT = mongoose.model("PRODUCT", productSchema);
module.exports = PRODUCT;
