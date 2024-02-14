import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function EditProduct() {
  const [formdata, setFormdata] = useState({
    productID: 0,
    productname: "",
    productdescription: "",
    productcategory: "",
    productquantity: 0,
    productprice: 0,
  });
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    const fetching = async () => {
      const t = localStorage.getItem("access_token");
      const res = await fetch(
        `https://inventory-app-01.onrender.com/api/products/editproduct/${params.id}`,
        {
          headers: {
            Authorization: `Bearer ${t}`,
          },
        }
      );
      const data = await res.json();
      setFormdata(data);
    };
    fetching();
  }, [params.id]);
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
      const t = localStorage.getItem("access_token");
      const res = await fetch(
        `https://inventory-app-01.onrender.com/api/products/editproductdone/${params.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${t}`,
          },
          body: JSON.stringify(formdata),
        }
      );

      if (!res.ok) {
        const data = await res.json();
        console.log(data.message);
        return;
      }

      const data = await res.json();

      setFormdata(data);
      navigate("/products");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="mx-5 my-5 p-3 flex flex-col items-center bg-white shadow-lg rounded-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-5">
          Edit Your Products
        </h1>
        <form
          className="flex flex-col gap-5 w-full sm:w-4/5 py-5"
          onSubmit={handlesubmit}
        >
          <input
            type="number"
            placeholder="Product ID"
            id="productID"
            className="p-3 border rounded-lg focus:outline-none"
            inputMode="numeric"
            onChange={handlechange}
            value={formdata.productID}
          />
          <input
            type="text"
            placeholder="Product Name"
            id="productname"
            className="p-3 border rounded-lg focus:outline-none"
            onChange={handlechange}
            value={formdata.productname}
          />
          <input
            type="text"
            placeholder="Product Category"
            id="productcategory"
            className="p-3 border rounded-lg focus:outline-none"
            onChange={handlechange}
            value={formdata.productcategory}
          />
          <input
            type="number"
            placeholder="Product Price"
            id="productprice"
            className="p-3 border rounded-lg focus:outline-none"
            onChange={handlechange}
            value={formdata.productprice}
          />
          <input
            type="number"
            placeholder="Product Quantity"
            id="productquantity"
            className="p-3 border rounded-lg focus:outline-none"
            inputMode="numeric"
            onChange={handlechange}
            value={formdata.productquantity}
          />
          <input
            type="text"
            placeholder="Product Description"
            id="productdescription"
            className="p-3 border rounded-lg focus:outline-none"
            onChange={handlechange}
            value={formdata.productdescription}
          />
          <button className="p-3 border uppercase text-xl font-semibold bg-blue-600 rounded-lg hover:opacity-75 text-white transition duration-300">
            EDIT
          </button>
        </form>
      </div>
    </div>
  );
}
