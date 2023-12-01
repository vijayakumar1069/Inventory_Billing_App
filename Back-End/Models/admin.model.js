const mongoose = require("mongoose");
const PRODUCT = require("./admin.products.js");

const adminSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PRODUCT",
      },
    ],
  },
  {
    timestamps: true,
  }
);
const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
