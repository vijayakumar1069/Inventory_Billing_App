const INVOICE = require("../Models/admin.invoice.model");
const PRODUCT = require("../Models/admin.products");
const CUSTOMER = require("../Models/admin.customer");
const errorHandler = require("../Utils/errorHandler");
const getdashboarddetails = async (req, res, next) => {
  try {
    const product = await PRODUCT.find();

    const costoftotalproduct = product.reduce(
      (acc, pro) => acc + pro.productprice * pro.initailquantity,
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
    const outofstockproducts = product.filter(
      (pro) => pro.productquantity == 0
    );

    const outofstock = outofstockproducts.length;
    const totalinvoices = invoices.length;
    const topProducts = await INVOICE.aggregate([
      { $unwind: "$products" },
      {
        $group: {
          _id: "$products._id",
          productName: { $first: "$products.productname" },
          totalsales: {
            $sum: {
              $multiply: [
                "$products.productprice",
                "$products.productquantity",
              ],
            },
          },
        },
      },
      { $sort: { totalsales: -1 } },
      {
        $limit: 3,
      },
    ]);
    const topCustomers = await CUSTOMER.aggregate([
      {
        $lookup: {
          from: "products",
          localField: "previouslyOrderedProducts",
          foreignField: "_id",
          as: "orderedproducts",
        },
      },
      {
        $unwind: "$orderedproducts",
      },
      {
        $group: {
          _id: "$_id",
          name: { $first: "$name" },
          totalQuantity: { $sum: "$orderedproducts.productquantity" },
        },
      },
      { $sort: { totalQuantity: -1 } },
      {
        $limit: 2,
      },
    ]);
    const topInvoices = await INVOICE.aggregate([
      { $unwind: "$products" },
      {
        $group: {
          _id: "$_id",
          invoiceNumber: { $first: "$invoiceNumber" },
          totalCost: {
            $sum: {
              $multiply: [
                "$products.productprice",
                "$products.productquantity",
              ],
            },
          },
        },
      },
      {
        $sort: { totalCost: -1 },
      },
      { $limit: 3 },
    ]);
    res.status(200).json({
      costoftotalproduct,
      totalcustomer,
      totalinvoicecost,
      outofstock,
      totalinvoices,
      topProducts,
      topCustomers,
      topInvoices,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getdashboarddetails,
};
