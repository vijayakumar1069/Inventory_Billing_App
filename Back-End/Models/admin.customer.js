const mongoose = require("mongoose");
const PRODUCT=require("./admin.products")

const customerSchema = new mongoose.Schema(
  {
    customerID: {
      type: Number,
      required: true,
      unique: true
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    previouslyOrderedProducts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref:"PRODUCT",
      },
    ],
  },
  { timestamps: true }
);
const CUSTOMER = mongoose.model("CUSTOMER", customerSchema);
module.exports = CUSTOMER;
