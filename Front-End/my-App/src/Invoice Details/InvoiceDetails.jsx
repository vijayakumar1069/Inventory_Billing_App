import React, { useEffect, useState } from "react";

export default function InvoiceDetails() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [formdata, setFormData] = useState({
    invoiceNumber: "",
    issuedate: "",
    dueDate: "",
    status: "",
  });

  useEffect(() => {
    const fetching = async () => {
      const params = new URLSearchParams();

      // Add form data properties to URLSearchParams
      for (const key in formdata) {
        if (formdata.hasOwnProperty(key)) {
          params.append(key, formdata[key]);
        }
      }

      // Update the URL with the new parameters
      window.history.replaceState({}, "", `?${params.toString()}`);

      console.log(params);

      const res = await fetch(
        `/api/invoices/getallInvoices?${params.toString()}`
      );
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        setError(data.message);
      }

      setInvoices((prev) => [...prev, ...data]);
    };
    fetching();
  }, []);
  const handlechange = (e) => {
    setFormData({ ...formdata, [e.target.id]: e.target.value });
  };
  const handlesubmit = async (e) => {
    e.preventDefault();
    const params = new URLSearchParams();

    // Add form data properties to URLSearchParams
    for (const key in formdata) {
      if (formdata.hasOwnProperty(key)) {
        params.append(key, formdata[key]);
      }
    }

    // Update the URL with the new parameters
    window.history.replaceState({}, "", `?${params.toString()}`);

    console.log(params);

    const res = await fetch(
      `/api/invoices/getallInvoices?${params.toString()}`
    );
    const data = await res.json();
    console.log(data);
    if (data.success === false) {
      setError(data.message);
    }

    setInvoices(data);
  };

  return (
    <div className="flex flex-col gap-6 max-w-xs  sm:max-w-full mx-3">
      <form
        onSubmit={handlesubmit}
        className="flex flex-col gap-5 my-5 px-3  p-2 rounded-lg bg-violet-200"
      >
        <div className=" flex gap-5 ">
          <label className="font-semibold w-32">InvoiceNumber:</label>
          <input
            type="number"
            placeholder="Invoice Number"
            id="invoiceNumber"
            className="border p-3 rounded-lg  w-full"
            onChange={handlechange}
          />
        </div>
        <div className=" flex gap-5">
          <label className="font-semibold w-32">issuedate :</label>
          <input
            type="date"
            placeholder="Issue date"
            id="issuedate"
            className="border p-3 rounded-lg w-full"
            onChange={handlechange}
          />
        </div>
        <div className=" flex gap-5">
          <label className="font-semibold w-32">duedate :</label>
          <input
            onChange={handlechange}
            type="date"
            placeholder="Issue date"
            id="dueDate"
            className="border p-3 rounded-lg w-full"
          />
        </div>
        <div className=" flex gap-5">
          <label className="font-semibold w-32">status :</label>
          <select id="status" onChange={handlechange}>
            <option value="Pending">Pending</option>
            <option value="Paid">Paid</option>
            <option value="Shipped">Shipped </option>
            <option value="Delivered">Delivered</option>
          </select>
        </div>
        <button className="p-3 border bg-blue-700 rounded-lg hover:opacity-80 text-white uppercase">
          Search..
        </button>
      </form>

      <div className="p-4 ">
        <div className="overflow-x-auto">
          {invoices.length > 0 ? (
            <table className="min-w-full rounded-lg  bg-white border border-collapse border-gray-300 ">
              <thead className="bg-blue-100    ">
                <tr className="text-center ">
                  <th className="py-2">Invoice ID</th>
                  <th className="py-2">Items</th>
                  <th className="py-2">Customer Details</th>
                  <th className="py-2">Status</th>
                  <th className="py-2">Issue Date</th>
                  <th className="py-2">Due Date</th>
                  <th className="py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice, i) => (
                  <tr key={i} className="hover:bg-gray-200 text-center">
                    <td className="py-2 border-l border-r">
                      {invoice.invoiceNumber}
                    </td>
                    <td className="py-2 border-l border-r">
                      {invoice.products &&
                        invoice.products.map((product, index) => (
                          <div key={index}>
                            <p>{product.productname}</p>
                            <p className="">
                              Quantity:
                              <span className="text-xl text-slate-500">
                                {product.productquantity}
                              </span>
                            </p>
                          </div>
                        ))}
                    </td>
                    <td className="py-2 border-l border-r">
                      <p>{invoice.customer && invoice.customer.name}</p>
                      <p>{invoice.customer && invoice.customer.email}</p>
                      <p>{invoice.customer && invoice.customer.address}</p>
                    </td>

                    <td className="py-2 border-l border-r">{invoice.status}</td>
                    <td className="py-2 border-l border-r">
                      {invoice.issuedate}
                    </td>
                    <td className="py-2 border-l border-r">
                      {invoice.dueDate}
                    </td>
                    <td className="py-2 border-l border-r">
                      <div className="flex p-2 items-center gap-2 ">
                        <button className="bg-blue-500 text-white px-2 py-1 rounded">
                          Update
                        </button>
                        <button className="bg-red-500 text-white px-2 py-1 rounded">
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center text-gray-500">No Invoices created</p>
          )}
        </div>
      </div>
    </div>
  );
}
