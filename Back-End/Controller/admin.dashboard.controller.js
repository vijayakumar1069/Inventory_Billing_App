const INVOICE = require("../Models/admin.invoice.model");
const PRODUCT = require("../Models/admin.products");
const CUSTOMER = require("../Models/admin.customer");
const getdashboarddetails = async (req, res, next) => {
  const product = await PRODUCT.find();

  const costoftotalproduct = product.reduce(
    (acc, pro) => acc + pro.productprice * pro.productquantity,
    0
  );
  const customer = await CUSTOMER.find();
  const totalcustomer = customer.length;
  const invoices = await INVOICE.find();
  const totalinvoicecost = invoices.reduce((acc, invoice) => {
    return (
      acc +
      invoice.products.reduce(
        (productacc, product) =>
          productacc + product.productprice * product.productquantity,
        0
      )
    );
  }, 0);

  console.log(costoftotalproduct, totalcustomer, totalinvoicecost);

  res.status(200).json({ costoftotalproduct });
};

module.exports = {
  getdashboarddetails,
};
