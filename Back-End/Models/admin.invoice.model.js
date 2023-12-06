const mongoose = require("mongoose");
const invoiceSchema = new mongoose.Schema(
  {
    invoiceNumber: {
      type: String,
      required: true,
      unique: true,
    },
    issuedate: {
      type: Date,
      default: Date.now,
    },
    dueDate: {
      type: date,
    },
    products: [
      {
        productname: String,
        productdescription: String,
        productquantity: Number,
        productprice: Number,
      },
    ],
    customer: [{ name: String, email: String, address: String }],
    status: {
      type: String,
      enum: ["Pending", "Paid", "Shipped", "Delivered"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

invoiceSchema.pre("save", async function (next) {
  try {
    if (!this.invoiceNumber) {
      const lastInvoice = await this.constructor.findOne(
        {},
        {},
        { sort: { invoiceNumber: -1 } }
      );
      const lastInvoiceNumber = lastInvoice
        ? parseInt(lastInvoice.invoiceNumber.slice(4))
        : 0;
      this.invoiceNumber =
        "INV-" + (lastInvoiceNumber + 1).toString().padStart(4, "0");
    }
    next();
  } catch (error) {
    next(error);
  }
});
