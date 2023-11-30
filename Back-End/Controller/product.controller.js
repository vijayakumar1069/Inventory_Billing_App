const PRODUCT = require("../Models/admin.products");
const errorHandler = require("../Utils/errorHandler");
const ADMIN = require("../Models/admin.model.js");

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

    const admin = await ADMIN.findById(req.user.id);

    admin.products = admin.products || [];

    admin.products.push(newproduct._id);

    await admin.save();
    res.status(200).json(newproduct );
  } catch (error) {
    next(error);
  }
};

module.exports = { addProduct };
