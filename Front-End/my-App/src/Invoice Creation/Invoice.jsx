import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

export default function Invoice() {
  const [currentproduct, setCurrentProduct] = useState({
    productID: 0,
    productname: "",
    productdescription: "",
    productcategory: "",
    productquantity: 1,
    productprice: 0,
  });

  const [date, setDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [totalprice, setTotalPrice] = useState(0);
  const [gstfortotalprice, setGstfortotalprice] = useState(0);
  const [toalamountwithgst, setToalamountwithgst] = useState(0);
  const [currentCustomer, setCurrentCustomer] = useState({
    customerID: 0,
    name: "",
    email: "",
    address: "",
  });
  const [error, setError] = useState(false);
  const [prevProducts, setPrevProducts] = useState([]);

  const handlesearchProductID = async () => {
    try {
      const res = await fetch(
        `/api/products/getproduct/${currentproduct.productID}`
      );
      const data = await res.json();
      if (data.success === false) {
        setError(data.message);
        return;
      }
      setError(false);
      setCurrentProduct({ ...data, productquantity: 1 });
    } catch (error) {
      setError(error.message);
    }
  };

  const handlechange = (e) => {
    setCurrentProduct({ ...currentproduct, [e.target.id]: e.target.value });
  };

  const handlecustomerchange = (e) => {
    setCurrentCustomer({
      ...currentCustomer,
      [e.target.id]: e.target.value,
    });
  };

  const handlesearchCustomerID = async () => {
    try {
      const res = await fetch(
        `/api/customers/getcustomer/${currentCustomer.customerID}`
      );
      const data = await res.json();
      if (data.success === false) {
        setError(data.message);
      }
      setError(false);
      setCurrentCustomer(data);
      console.log("customer", data);
    } catch (error) {
      console.log(error);
    }
  };

  const hanldeaddmore = () => {
    if (currentproduct.productID === 0) {
      return setError("Enter Correct product ID");
    }

    setPrevProducts((prev) => [currentproduct, ...prev]);
    setCurrentProduct({
      productID: 0,
      productname: "",
      productdescription: "",
      productcategory: "",
      productquantity: 1,
      productprice: 0,
    });
  };

  const calculateTotalPrice = () => {
    const updatedTotalPrice =
      currentproduct.productquantity * currentproduct.productprice +
      prevProducts.reduce(
        (acc, product) => acc + product.productquantity * product.productprice,
        0
      );
    setTotalPrice(updatedTotalPrice);
  };

  const calculateGstfortotalprice = () => {
    setGstfortotalprice(totalprice * (18 / 100));
  };

  const calculateToalamountwithgst = () => {
    const totalAmountWithGst = totalprice + gstfortotalprice;
    setToalamountwithgst(totalAmountWithGst);
  };

  useEffect(() => {
    currentproduct.productquantity = Number(currentproduct.productquantity);
    calculateTotalPrice();
    console.log("prev products before sending the server side", prevProducts);
    calculateGstfortotalprice();
    calculateToalamountwithgst();
  }, [currentproduct, prevProducts, totalprice]);

  const handlesubmit = async (e) => {
    e.preventDefault();

    if (currentproduct.productID !== 0) {
      prevProducts.push(currentproduct);
    }

    if (prevProducts.length === 0 && currentproduct.productID === 0) {
      setError("Add at least one product before creating an invoice.");
      return;
    }

    try {
      setLoading(true);
      const dataforserverside = JSON.stringify({
        prevProducts,
        currentCustomer,
        date,
      });
      const res = await fetch("/api/invoices/createInvoice", {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: dataforserverside,
      });
      const data = await res.json();
      if (data.success === false) {
        setError(data.message);
        setLoading(false);
        return;
      }
      setLoading(false);
      setSuccess("Invoice Created Successfully....");
      setCurrentProduct({
        productID: 0,
        productname: "",
        productdescription: "",
        productcategory: "",
        productquantity: 1,
        productprice: 0,
      });
      setCurrentCustomer({ customerID: 0, name: "", email: "", address: "" });
      setPrevProducts([]);
      setError(false);
      console.log(data);
    } catch (error) {
      console.log(error);
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center my-4">
        Create your Invoice
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3">
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-2">
            <label className="w-32 font-semibold">Product ID </label>
            <div className="flex items-center gap-5">
              <input
                type="number"
                id="productID"
                placeholder="Enter product ID"
                className="rounded-lg p-3 border w-full"
                onChange={handlechange}
                value={currentproduct.productID}
              />
              <FaSearch
                size={35}
                onClick={handlesearchProductID}
                className="cursor-pointer"
              />
            </div>
          </div>

          {error && <p className="p-2 font-semibold text-red-700">{error}</p>}
        </div>
        <div className="flex items-center gap-5">
          <label className="w-32 font-semibold">Product Name</label>
          <input
            onChange={handlechange}
            className="rounded-lg p-3 border w-full"
            type="text"
            id="productname"
            placeholder="Enter Product Name"
            value={currentproduct.productname}
          />
        </div>
        <div className="flex items-center gap-5">
          <label className="w-32 font-semibold">Description </label>
          <input
            onChange={handlechange}
            className="rounded-lg p-3 border w-full"
            type="text"
            id="productdescription"
            placeholder="Enter Product Description"
            value={currentproduct.productdescription}
          />
        </div>
        <div className="flex items-center gap-5">
          <label className="w-32 font-semibold">Category </label>
          <input
            className="rounded-lg p-3 border w-full"
            type="text"
            id="productcategory"
            value={currentproduct.productcategory}
            placeholder="Enter Product Category"
          />
        </div>
        <div className="flex items-center gap-5">
          <label className="w-32 font-semibold">Quantity </label>
          <input
            onChange={handlechange}
            className="rounded-lg p-3 border w-full"
            type="number"
            id="productquantity"
            required
            placeholder="Number of Quantities"
            value={currentproduct.productquantity}
          />
        </div>
        <div className="flex items-center gap-5">
          <label className="w-32 font-semibold">Price </label>
          <input
            onChange={handlechange}
            className="rounded-lg p-3 border w-full"
            type="number"
            id="productprice"
            placeholder="Product Price"
            value={currentproduct.productprice}
          />
        </div>

        <button
          type="button"
          onClick={hanldeaddmore}
          className="p-3 bg-blue-800 hover:opacity-80 rounded-lg border uppercase text-white font-semibold"
        >
          Add More Products...
        </button>
      </div>

      <div className="mt-6 p-4">
        {prevProducts.length > 0 && (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-collapse border-black">
              <thead>
                <tr>
                  <th className="py-2">Product ID</th>
                  <th className="py-2">Name</th>
                  <th className="py-2">Category</th>
                  <th className="py-2">Quantity</th>
                  <th className="py-2">Price/Product</th>
                  <th className="py-2">Total Price </th>
                </tr>
              </thead>

              <tbody>
                {prevProducts.map(
                  (product, index) =>
                    // Add a condition to check if the product is not empty
                    product.productID !== 0 && (
                      <tr key={index}>
                        <td className="py-2 text-center">
                          {product.productID}
                        </td>
                        <td className="py-2 text-center">
                          {product.productname}
                        </td>
                        <td className="py-2 text-center">
                          {product.productcategory}
                        </td>
                        <td className="py-2 text-center">
                          {product.productquantity}
                        </td>
                        <td className="py-2 text-center">
                          {product.productprice}
                        </td>
                        <td className="py-2 text-center">
                          {product.productprice * product.productquantity}
                        </td>
                      </tr>
                    )
                )}
              </tbody>
            </table>
            <div className="flex mt-4 flex-col ">
              <div className="text-right flex flex-col gap-6 ">
                <div className="mb-2 flex justify-between">
                  <h3 className="font-semibold">Total Amount - </h3>
                  <p>{totalprice}</p>
                </div>
                <div className="mb-2 flex justify-between">
                  <h3 className="font-semibold">GST % -</h3>
                  <p>{gstfortotalprice}</p>
                </div>
                <div className="mb-2 flex justify-between">
                  <h3 className="font-semibold">Amount need to Pay - </h3>
                  <p>{toalamountwithgst}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <h1 className="text-2xl text-center font-bold my-3 p-2">
        Customer Details
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        <div className="flex items-center gap-4">
          <label className="font-semibold w-32"> Customer ID </label>
          <div className="flex items-center gap-5">
            <input
              type="text"
              id="customerID"
              className="rounded-lg p-3 border w-full"
              placeholder="Enter Customer ID"
              value={currentCustomer.customerID}
              onChange={handlecustomerchange}
            />
            <FaSearch
              size={35}
              onClick={handlesearchCustomerID}
              className="cursor-pointer"
            />
          </div>
        </div>
        <div className="flex items-center gap-5">
          <label className="font-semibold w-32">Name </label>
          <input
            type="text"
            id="name"
            className="rounded-lg p-3 border w-full"
            placeholder="Enter Customer name"
            value={currentCustomer.name}
            onChange={handlecustomerchange}
          />
        </div>
        <div className="flex items-center gap-5">
          <label className="w-32 font-semibold">Email </label>
          <input
            type="email"
            id="email"
            className="rounded-lg p-3 border w-full"
            placeholder="Enter Customer email"
            onChange={handlecustomerchange}
            value={currentCustomer.email}
          />
        </div>
        <div className="flex items-center gap-5">
          <label className="w-32 font-semibold">Address </label>
          <input
            type="text"
            id="address"
            className="rounded-lg p-3 border w-full"
            placeholder="Enter Customer address"
            onChange={handlecustomerchange}
            value={currentCustomer.address}
          />
        </div>
        <div className="flex items-center gap-5">
          <label className="font-semibold w-32">Due Date </label>
          <input
            type="date"
            id="date"
            className="rounded-lg p-3 border w-full"
            required
            onChange={(e) => {
              setDate(e.target.value);
            }}
          />
        </div>
      </div>

      <button
        disabled={loading}
        onClick={handlesubmit}
        className="p-3 border w-full uppercase text-white font-semibold my-4 bg-green-700 hover:opacity-75 rounded-lg transform transition-transform duration-300 hover:scale-105"
      >
        {loading ? "CREATING...." : "CREATE INVOICE"}
      </button>
      {success && (
        <p className="text-green-700 text-center font-semibold">{success}</p>
      )}
      {error && (
        <p className="text-red-700 text-center font-semibold">{error}</p>
      )}
    </div>
  );
}
