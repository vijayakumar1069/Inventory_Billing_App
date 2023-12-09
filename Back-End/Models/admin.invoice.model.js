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
    // issuedate: {
    //   type: Date,
    //   default: Date.now,
    // },
    // dueDate: {
    //   type: Date,
    // },
    // issuedate: {
    //   type: String,
    //   default: () => new Date().toISOString().split("T")[0],
    // },
    // dueDate: {
    //   type: String,
    //   default: () => new Date().toISOString().split("T")[0],
    // },
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
