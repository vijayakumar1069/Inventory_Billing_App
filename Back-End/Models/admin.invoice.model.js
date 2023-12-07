const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema(
  {
    invoiceNumber: {
      type: String,
      required: true,
      unique: true,
    },
    issuedate: {
      type: String,
      default: () => new Date().toLocaleDateString("en-US"),
    },
    dueDate: {
      type: String,
    },
    products: [
      {
        productname: String,
        productdescription: String,
        productquantity: Number,
        productprice: Number,
      },
    ],
    customer: { name: String, email: String, address: String },
    status: {
      type: String,
      enum: ["Pending", "Paid", "Shipped", "Delivered"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

const INVOICE = mongoose.model("INVOICE", invoiceSchema);

module.exports = INVOICE;
