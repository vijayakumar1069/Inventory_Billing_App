const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const body_parser = require("body-parser");
const dotenv = require("dotenv").config();
const app = express();
app.use(body_parser.json());
app.use(express.json());
app.use(cors());
const mondbconnection = mongoose
  .connect(process.env.URL)
  .then(() => {
    console.log("db connection established");
  })
  .catch((Error) => {
    console.log("error connecting", Error);
  });

app.listen(process.env.PORT, (req, res) => {
  console.log("port running", process.env.PORT);
});
