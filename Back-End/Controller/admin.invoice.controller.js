const mongoose = require("mongoose");

const INVOICE = require("../Models/admin.invoice.model.js");
const { format, parseISO } = require("date-fns");

const createInvoice = async (req, res, next) => {
  try {
    console.log(req.body.date);
    console.log(req.body.prevProducts);
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

    // If parseInt returns NaN, default to 1
    if (isNaN(lastInvoiceNumber)) {
      lastInvoiceNumber = 0;
    }

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
    const currentdate = format(new Date(), "yyyy/MM/dd");
    const duedate = format(parseISO(req.body.date), "yyyy/MM/dd");
    console.log(currentdate);
    const newInvoice = new INVOICE({
      invoiceNumber: newInvoiceNumber,
      issuedate: currentdate.toString(),
      products: req.body.prevProducts,
      customer: req.body.currentCustomer,
      status: "Pending",
      dueDate: duedate.toString(), //
    });

    await newInvoice.save();

    res.status(200).json({ newInvoice });
  } catch (error) {
    next(error);
  }
};

const getallInvoices = async (req, res, next) => {
  console.log(req.query);
  try {
    // Extract filtering parameters from the request query
    const { invoiceNumber, issuedate, dueDate, status } = req.query;

    console.log(invoiceNumber);
    // Build the filter object
    let filter = {};

    if (invoiceNumber !== "" && invoiceNumber !== undefined) {
      filter.invoiceNumber = invoiceNumber;
    }

    if (issuedate !== "" && issuedate !== undefined) {
      // Parse the date from the client-side format (yy/mm/dd) to server-side format (MM/dd/yyyy)
      const parsedIssuedate = issuedate.split("-").join("/");
      console.log("hi   --------", parsedIssuedate.toString());
      filter.issuedate = { $eq: parsedIssuedate.toString() }; // Use the parsed date for filtering
    }

    if (dueDate !== "" && dueDate !== undefined) {
      // Parse the due date using the same logic as issuedate
      const parsedDueDate = dueDate.split("-").join("/");
      console.log("due date: ", parsedDueDate.toString());

      filter.dueDate = { $eq: parsedDueDate.toString() };
    }

    if (status !== "" && status !== undefined) {
      filter.status = { $in: [status] };
    }

    // Fetch invoices based on the filter or return all invoices
    const invoices = Object.keys(filter).length
      ? await INVOICE.find(filter)
      : await INVOICE.find();
    // const invoices = await INVOICE.find({
    //   ...(invoiceNumber && { invoiceNumber: { $eq: invoiceNumber } }),
    //   ...(issuedate && { issuedate: { $lte: issuedate } }),
    //   ...(dueDate && { dueDate: { $lte: dueDate } }),
    //   ...(status && {
    //     status: { $in: ["Pending", "Paid", "Shipped", "Delivered"] },
    //   }),
    // });

    res.status(200).json(invoices);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = {
  createInvoice,
  getallInvoices,
};
