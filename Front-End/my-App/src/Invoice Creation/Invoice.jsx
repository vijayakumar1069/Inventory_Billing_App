import React, { useState } from "react";
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
      console.log(data)
      setCurrentProduct(data);
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
            onChange={handlechange}
            className="rounded-lg p-3 border w-full "
            type="text"
            id="productcategory"
            placeholder="enter product Category"
            value={currentproduct.productcategory}
          />
        </div>

        <div className="flex gap-5 items-center">
          <label className="font-semibold w-32 ">quantity  : </label>
          <input

            onChange={handlechange}
            className="rounded-lg p-3 border w-full  "
            type="number"
            id="productquantity"
            placeholder="Numbere of Quantities "
            min={1}
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

        <button className="p-3 bg-blue-800 hover:opacity-80 rounded-lg border uppercase text-white font-semibold">
          Add More Products...
        </button>
      </div>
      <h1 className="text-2xl text-center font-bold my-3 p-2">customer Details</h1>
      <div className="flex flex-col gap-4 ">
        <div className="flex gap-4 items-center">
            <label className="font-semibold w-32"> CustomerID : </label>
            <div className="flex gap-5 items-center">
          <input
            type="text"
            id="customerID"
            className="rounded-lg p-3 border "
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
          className="rounded-lg p-3 border "
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
          className="rounded-lg p-3 border "
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
          className="rounded-lg p-3 border "
          placeholder="Enter Customer address"
          onChange={handlecustomerchange}
          value={currentCustomer.address}
        />
        </div>
      </div>
      <button className="p-3 border bg-green-700 hover:opacity-75 rounded-lg  ">
        create Invoice{" "}
      </button>
    </div>
  );
}
