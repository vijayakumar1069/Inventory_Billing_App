import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProductTable from "./ProductTable";

export default function AddProduct() {
  const { currentUser } = useSelector((state) => state.admin);
  const [prevProducts, setPrevProducts] = useState({});
  const [formdata, setFormdata] = useState({
    productID: 0,
    productname: "",
    productdescription: "",
    productcategory: "",
    productquantity: 0,
    productprice: 0,
  });
  useEffect(() => {
    const fetching = async () => {
      try {
        const res = await ftech(`/api/products/getproducts/${currentUser._id}`);
        const data = await res.json();
        if (data.success === false) {
          console.log(data.message);
        }
        setPrevProducts(data);
      } catch (error) {
        console.log(error.message);
      }
    };
  }, []);
  console.log(formdata);
  const handlechange = (e) => {
    setFormdata({
      ...formdata,
      [e.target.id]: e.target.value,
    });
  };
  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/products/addproduct/${currentUser._id}`, {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      });
      const data = await res.json();
      if (data.success === false) {
        return console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className=" ">
      <div className="mx-5 my-5 p-3 flex flex-col items-center ">
        <h1 className="text-2xl font-semibold text-slate-800">
          Add Your Products
        </h1>
        <form
          className="flex flex-col gap-5 w-full sm:w-4/5 py-5  "
          onSubmit={handlesubmit}
        >
          <input
            type="number"
            placeholder="Producr ID"
            id="productID"
            className="p-3 border rounded-lg "
            inputMode="numeric"
            onChange={handlechange}
          />
          <input
            type="text"
            placeholder="Product Name"
            id="productname"
            className="p-3 border rounded-lg "
            onChange={handlechange}
          />
          <input
            type="text"
            placeholder="Product category"
            id="productcategory"
            className="p-3 border rounded-lg "
            onChange={handlechange}
          />
          <input
            type="number"
            placeholder="Product price"
            id="productprice"
            className="p-3 border rounded-lg "
            onChange={handlechange}
          />
          <input
            type="number"
            min={1}
            id="quantity"
            placeholder="productquantity"
            className="p-3 border rounded-lg "
            inputMode="numeric"
            onChange={handlechange}
          />
          <input
            type="text"
            placeholder="Prduct description"
            id="productdescription"
            className="p-3 border rounded-lg "
            onChange={handlechange}
          />
          <button className="p-3 border uppercase text-xl font-semibold  hover:opacity-75 bg-blue-600 rounded-lg">
            ADD
          </button>
        </form>
      </div>
    </div>
  );
}
