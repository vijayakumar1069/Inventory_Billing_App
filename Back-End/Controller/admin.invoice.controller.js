const mongoose = require("mongoose");

const INVOICE = require("../Models/admin.invoice.model.js");

async function createInvoice(req, res, next) {
  try {
    let existingInvoice;
    let newInvoiceNumber;

    // Generate a unique invoice number based on last invoice number
    let lastInvoice = await INVOICE.findOne(
      {},
      {},
      { sort: { invoiceNumber: -1 } }
    );
    let lastInvoiceNumber = lastInvoice
      ? parseInt(lastInvoice.invoiceNumber.slice(4))
      : 0;

    do {
      newInvoiceNumber = (lastInvoiceNumber + 1).toString().padStart(2, "0");
      existingInvoice = await INVOICE.findOne({
        invoiceNumber: newInvoiceNumber,
      });

      if (existingInvoice) {
        lastInvoiceNumber++;
      }
    } while (existingInvoice);

    // Create new invoice with unique invoice number
    const newInvoice = new INVOICE({
      invoiceNumber: newInvoiceNumber,
      issuedate: new Date().toLocaleDateString("en-US"),

      products: req.body.prevProducts,
      customer: req.body.currentCustomer,
      status: "Pending",
      dueDate: new Date(req.body.date).toLocaleDateString("en-US"), //
    });

    await newInvoice.save();
    console.log(newInvoice);
    res.status(200).json({ newInvoice });
  } catch (error) {
    next(error);
  }
}
const getAllInvoices = async (req, res, next) => {
  try {
    const invoices = await INVOICE.find();
    res.status(200).json(invoices);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createInvoice,
  getAllInvoices,
};
