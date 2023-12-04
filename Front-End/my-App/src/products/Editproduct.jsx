import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function Editproduct() {
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
  const id = params.id;
  console.log(id);
  useEffect(() => {
    const fetching = async () => {
      const res = await fetch(`/api/products/editproduct/${id}`);
      const data = await res.json();
      setFormdata(data);
      console.log(data);
    };
    fetching();
  }, []);
  const handlechange = (e) => {
    setFormdata({
      ...formdata,
      [e.target.id]: e.target.value,
    });
  };
  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/products/editproductdone/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formdata),
      });

      // Check for successful response
      if (!res.ok) {
        const data = await res.json();
        console.log(data.message); // Log error message if response is not OK
        return; // Early return to prevent further processing
      }

      const data = await res.json();

      // Update state with the updated data
      setFormdata(data);
      navigate("/products");

      console.log("updated product", data);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="">
      <div className="mx-5 my-5 p-3 flex flex-col items-center ">
        <h1 className="text-2xl font-semibold text-slate-800">
          Edit Your Products
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
            value={formdata.productID}
          />
          <input
            type="text"
            placeholder="Product Name"
            id="productname"
            className="p-3 border rounded-lg "
            onChange={handlechange}
            value={formdata.productname}
          />
          <input
            type="text"
            placeholder="Product category"
            id="productcategory"
            className="p-3 border rounded-lg "
            onChange={handlechange}
            value={formdata.productcategory}
          />
          <input
            type="number"
            placeholder="Product price"
            id="productprice"
            className="p-3 border rounded-lg "
            onChange={handlechange}
            value={formdata.productprice}
          />
          <input
            type="number"
        
            id="productquantity"
            placeholder="productquantity"
            className="p-3 border rounded-lg "
            inputMode="numeric"
            onChange={handlechange}
            value={formdata.productquantity}
          />
          <input
            type="text"
            placeholder="Prduct description"
            id="productdescription"
            className="p-3 border rounded-lg "
            onChange={handlechange}
            value={formdata.productdescription}
          />
          <button className="p-3 border uppercase text-xl font-semibold  hover:opacity-75 bg-blue-600 rounded-lg">
            EDIT
          </button>
        </form>
      </div>
    </div>
  );
}
