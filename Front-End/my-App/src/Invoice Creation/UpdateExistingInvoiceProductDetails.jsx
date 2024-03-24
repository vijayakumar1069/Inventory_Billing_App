import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export const UpdateExistingInvoiceProductDetails = () => {
  const [prevProductsDetails, setPrevProductDetails] = useState({
    productdescription: "",
    productname: "",
    productprice: 0,
  });
  const navigate = useNavigate();
  const [error, setError] = useState(false);

  const [newquantity, setNewquantity] = useState(0);
  const params = useParams();
  const { id } = params;
  const productid = new URLSearchParams(window.location.search).get(
    "productid"
  );

  console.log(id);
  console.log(productid);
  useEffect(() => {
    const fetching = async () => {
      try {
        const t=localStorage.getItem("access_token");
        const res = await fetch(
          `http://localhost:3000/api/invoices/updateproductquantityinexisitinginvoice/${id}?productid=${productid}`,{
            headers:{
              Authorization: `Bearer ${t}`,
            }
          }
        );

        const data = await res.json();
        console.log(data.length);

        if (data) {
          // Update the state with the first item in the array
          setPrevProductDetails({
            productdescription: data.productdescription,
            productname: data.productname,
            productquantity: data.productquantity,
            productprice: data.productprice,
          });
        } else {
          console.error("Product not found");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetching();
  }, [id, productid]);

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const t=localStorage.getItem("access_token");
      const res = await fetch(
        `http://localhost:3000/api/invoices/updateproductsdoneinexistinginvoice/${id}?productid=${productid}`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${t}`,
          },
          body: JSON.stringify({ prevProductsDetails }),
        }
      );
      const data = await res.json();
      if (data.success === false) {
        setError(data.message);
        return;
      }
      navigate(`/updateinvoice/${id}`);
    } catch (error) {}
  };
  return (
    <div className="flex flex-col items-center">
      <h1 className="font-bold text-2xl text-center my-5 p-2">
        Your Product Details
      </h1>
      <div className="flex flex-col gap-y-5 w-[370px] sm:w-1/2">
        {/* Product Name */}
        <div className="flex gap-x-5 items-center p-3">
          <label className="w-40 p-3 font-semibold">Product:</label>
          <input
            type="text"
            placeholder="Product Name"
            value={prevProductsDetails.productname}
            className="p-3 rounded-lg border w-full focus:outline-none focus:ring focus:border-blue-300 transition duration-300"
          />
        </div>
        {/* Product Description */}
        <div className="flex gap-x-5 items-center p-3">
          <label className="w-40 p-3 font-semibold">Description:</label>
          <input
            type="text"
            placeholder="Product Description"
            value={prevProductsDetails.productdescription}
            className="p-3 rounded-lg border w-full focus:outline-none focus:ring focus:border-blue-300 transition duration-300"
          />
        </div>
        {/* Product Quantity */}
        <div className="flex gap-x-5 items-center p-3">
          <label className="w-40 p-3 font-semibold">Quantity:</label>
          <input
            type="Number"
            placeholder="Product Quantity"
            value={prevProductsDetails.productquantity}
            className="p-3 rounded-lg border w-full focus:outline-none focus:ring focus:border-blue-300 transition duration-300"
            onChange={(e) =>
              setPrevProductDetails({
                ...prevProductsDetails,
                productquantity: e.target.value,
              })
            }
          />
        </div>
        {error && (
          <p className="text-center text-red-600 font-semibold uppercase">
            {error}
          </p>
        )}
        {/* Product Price */}
        <div className="flex gap-x-5 items-center p-3">
          <label className="w-40 p-3 font-semibold">Price:</label>
          <input
            type="text"
            placeholder="Product Price"
            value={prevProductsDetails.productprice}
            className="p-3 rounded-lg border w-full focus:outline-none focus:ring focus:border-blue-300 transition duration-300"
          />
        </div>
        {/* Update Button */}
        <button
          onClick={handlesubmit}
          className="p-3 border mx-2 w-full bg-slate-800 font-semibold text-white uppercase rounded-lg text-center hover:bg-slate-900 shadow-md transition duration-300"
        >
          Update
        </button>
      </div>
    </div>
  );
};
