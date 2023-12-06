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
  const [initialQuantity, setInitialQuantity] = useState(1);

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
        console.log(data.message);
        setError(data.message);
        return;
      }
      setError(false);
      console.log(data);
      setCurrentProduct({ ...data, productquantity: 1 });
    } catch (error) {
      console.log(error);
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
    } catch (error) {
      console.log(error);
    }
  };
  const hanldeaddmore = () => {
    if (currentproduct.productID === 0) {
      return setError("Enter Correct product ID");
    }

    setPrevProducts([currentproduct, ...prevProducts]);
    setCurrentProduct({
      productID: 0,
      productname: "",
      productdescription: "",
      productcategory: "",
      productquantity: 1,
      productprice: 0,
    });
  };
  // Function to calculate total price
  const calculateTotalPrice = () => {
    const updatedTotalPrice =
      currentproduct.productquantity * currentproduct.productprice +
      prevProducts.reduce(
        (acc, product) => acc + product.productquantity * product.productprice,
        0
      );
    setTotalPrice(updatedTotalPrice);
  };

  // Function to calculate GST amount
  const calculateGstfortotalprice = () => {
    setGstfortotalprice(totalprice * (18 / 100));
  };

  // Function to calculate total amount with GST
  const calculateToalamountwithgst = () => {
    const totalAmountWithGst = totalprice + gstfortotalprice;
    setToalamountwithgst(totalAmountWithGst);
  };

  console.log("prevProducts", prevProducts);
  console.log("currentProducts", currentproduct);
  useEffect(() => {
    currentproduct.productquantity = Number(currentproduct.productquantity);
    calculateTotalPrice();
    calculateGstfortotalprice();
    calculateToalamountwithgst();
  }, [currentproduct, prevProducts, totalprice]);
  const handlesubmit = async (e) => {
    e.preventDefault();
    if (currentproduct.productID != 0) {
      setPrevProducts([currentproduct, ...prevProducts]);
      setCurrentProduct({
        productID: 0,
        productname: "",
        productdescription: "",
        productcategory: "",
        productquantity: 1,
        productprice: 0,
      });
    }
    try {
      const res = await fetch("/api/invoices/createInvoice", {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify({prevProducts, currentCustomer}),
      });
      const data=await res.json()
      console.log(data);
    } catch (error) {}
  };
  console.log("prevProducts after submission", prevProducts);

  return (
    <div>
      <h1 className="font-bold text-2xl text-center my-4 px-3">
        Create your Invoice{" "}
      </h1>
      <div className=" flex flex-col gap-4 flex-wrap ">
        <div className="flex flex-col gap-5">
          <div className=" flex gap-5 items-center">
            <label className="font-semibold w-32"> Product ID :</label>
            <input
              type="number"
              id="productID"
              placeholder="enter productID"
              className="rounded-lg p-3 border "
              onChange={handlechange}
              value={currentproduct.productID}
            />
            <FaSearch size={25} onClick={handlesearchProductID} />
          </div>
          <div className="">
            {" "}
            {error && (
              <p className=" p-2 font-semibold text-red-700">{error}</p>
            )}
          </div>
        </div>
        <div className="flex gap-5 items-center  ">
          <label className="font-semibold w-32">Product Name :</label>
          <input
            onChange={handlechange}
            className="rounded-lg p-3 border w-full  "
            type="text"
            id="productname"
            placeholder="enter Product Name"
            value={currentproduct.productname}
          />
        </div>
        <div className="flex gap-5 items-center">
          <label className="font-semibold w-32"> Description :</label>
          <input
            onChange={handlechange}
            className="rounded-lg p-3 border w-full  "
            type="text"
            id="productdescription"
            placeholder="enter productDescription"
            value={currentproduct.productdescription}
          />
        </div>
        <div className="flex gap-5 items-center">
          <label className="font-semibold w-32">category :</label>

          <input
            className="rounded-lg p-3 border w-full "
            type="text"
            id="productcategory"
            value={currentproduct.productcategory}
            placeholder="enter product Category"
          />
        </div>

        <div className="flex gap-5 items-center">
          <label className="font-semibold w-32 ">quantity : </label>
          <input
            onChange={handlechange}
            className="rounded-lg p-3 border w-full  "
            type="number"
            id="productquantity"
            required
            placeholder="Numbere of Quantities "
            value={currentproduct.productquantity}
          />
        </div>
        <div className="flex gap-4 items-center ">
          <label className="font-semibold w-32">Price :</label>
          <input
            onChange={handlechange}
            className="rounded-lg p-3 border w-full "
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
        <div className="flex flex-col gap-4 flex-wrap bg-rose-300">
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
                          <td className="py-2  text-center">
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
              <div className="flex  mt-4 flex-col ">
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
      </div>
      <h1 className="text-2xl text-center font-bold my-3 p-2">
        customer Details
      </h1>
      <div className="flex flex-col gap-4 ">
        <div className="flex gap-4 items-center">
          <label className="font-semibold w-32"> CustomerID : </label>
          <div className="flex gap-5 items-center">
            <input
              type="text"
              id="customerID"
              className="rounded-lg p-3 border w-full "
              placeholder="Enter Customer ID"
              value={currentCustomer.customerID}
              onChange={handlecustomerchange}
            />
            <FaSearch size={25} onClick={handlesearchCustomerID} />
          </div>
        </div>
        <div className="flex gap-5 items-center">
          <label className="font-semibold w-32">Name : </label>
          <input
            type="text"
            id="name"
            className="rounded-lg p-3 border w-full "
            placeholder="Enter Customer name"
            value={currentCustomer.name}
            onChange={handlecustomerchange}
          />
        </div>
        <div className="flex gap-5 items-center">
          <label className="w-32 font-semibold">Email</label>
          <input
            type="email"
            id="email"
            className="rounded-lg p-3 border w-full "
            placeholder="Enter Customer email"
            onChange={handlecustomerchange}
            value={currentCustomer.email}
          />
        </div>
        <div className="flex gap-5 items-center">
          <label className="w-32 font-semibold">Address</label>
          <input
            type="text"
            id="address"
            className="rounded-lg p-3 border w-full "
            placeholder="Enter Customer address"
            onChange={handlecustomerchange}
            value={currentCustomer.address}
          />
        </div>
      </div>
      <button
        onClick={handlesubmit}
        className="p-3 border w-full uppercase text-white font-semibold my-4 bg-green-700 hover:opacity-75 rounded-lg  "
      >
        create Invoice{" "}
      </button>
    </div>
  );
}
