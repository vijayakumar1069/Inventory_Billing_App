const PRODUCT = require("../Models/admin.products.js");
const errorHandler = require("../Utils/errorHandler");
const ADMIN = require("../Models/admin.model.js");
const mongoose = require("mongoose");

const addProduct = async (req, res, next) => {
  try {
    if (req.user.id != req.params.id) {
      return next(errorHandler(404, "your not authorized to add product"));
    }

    const newproduct = new PRODUCT({
      productID: req.body.productID,
      productname: req.body.productname,
      productdescription: req.body.productdescription,
      productcategory: req.body.productcategory,
      productquantity: req.body.productquantity,
      productprice: req.body.productprice,
    });
    await newproduct.save();

    const admin = await ADMIN.findById(req.user.id);

    admin.products = admin.products || [];

    admin.products.push(newproduct._id);
    // admin.update({ $addToSet: { products: newproduct._id } });


    await admin.save();
    res.status(200).json(newproduct);
  } catch (error) {
    next(error);
  }
};
const getProducts = async (req, res, next) => {
  if (req.user.id != req.params.id) {
    return next(errorHandler(404, "You are not authorized"));
  }

  try {
    const admin = await ADMIN.findById(req.user.id).populate({
      path: "products",
      options: { sort: { createdAt: -1 } }, // Sort products in descending order based on createdAt
    })
    // Access products directly from the populated array
    const products = admin.products;
    console.log(products);

    // Respond with the desired data
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    next(errorHandler(500, "Internal Server Error"));
  }
};

module.exports = getProducts;

module.exports = { addProduct, getProducts };
