const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const body_parser = require("body-parser");
const dotenv = require("dotenv").config();
const adminRoutes = require("./Routes/admin.route.js");
const productsRoutes=require("./Routes/product.route.js")
const cookieparser = require("cookie-parser");
const app = express();
app.use(body_parser.json());
app.use(express.json());
app.use(cors());
app.use(cookieparser());
const mondbconnection = mongoose
  .connect(process.env.URL)
  .then(() => {
    console.log("db connection established");
  })
  .catch((Error) => {
    console.log("error connecting", Error);
  });

app.use("/api/admin", adminRoutes);
app.use("/api/products", productsRoutes);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(400).json({
    success: false,
    message,
    statusCode,
  });
});

app.listen(process.env.PORT, (req, res) => {
  console.log("port running", process.env.PORT);
});
