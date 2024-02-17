import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function AddProduct() {
  const { currentUser } = useSelector((state) => state.admin);
  const [prevProducts, setPrevProducts] = useState([]);
  const [formdata, setFormdata] = useState({
    productID: null,
    productname: "",
    productdescription: "",
    productcategory: "",
    productquantity: null,
    productprice: null,
    initailquantity: null,
  });
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetching = async () => {
      try {
        const t = localStorage.getItem("access_token");
        const res = await fetch(
          `https://inventory-app-01.onrender.com/api/products/getproducts/${currentUser._id}`,
          {
            headers: {
              Authorization: `Bearer ${t}`,
            },
          }
        );
        const data = await res.json();
        if (data.success === false) {
          setError(data.message);
          return;
        }
        setPrevProducts(data);
        setError(false);
      } catch (error) {
        setError(error.message);
      }
    };
    fetching();
  }, [currentUser._id]);

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
      const res = await fetch(`https://inventory-app-01.onrender.com/api/products/addproduct/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${t}`,
        },
        body: JSON.stringify(formdata),
      });
      const data = await res.json();

      if (data.success === false) {
        setError(data.message);
        return;
      }
      setError(false);
      setPrevProducts([data, ...prevProducts]);
      setFormdata({
        productID: "",
        productname: "",
        productdescription: "",
        productcategory: "",
        productquantity: "",
        productprice: "",
        initailquantity: "",
      });
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`https://inventory-app-01.onrender.com/api/products/deleteproduct/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.message === false) {
        console.log(data.message);
      }

      setPrevProducts(prevProducts.filter((product) => product._id !== id));
      console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className=" my-5 p-3 flex-shrink-0 flex flex-col items-center bg-white shadow-lg rounded-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-5">
          Add Your Products
        </h1>
        <form
          className="flex flex-col gap-5 w-full sm:w-4/5 md:w-3/5 lg:w-2/5 py-5 "
          onSubmit={handlesubmit}
        >
          <input
            type="number"
            placeholder="Product ID"
            id="productID"
            value={formdata.productID}
            className="p-3 border rounded-lg focus:outline-none"
            inputMode="numeric"
            onChange={handlechange}
          />
          {error && (
            <p className="text-center text-2xl font-semibold text-red-700">
              {error}
            </p>
          )}
          <input
            type="text"
            placeholder="Product Name"
            id="productname"
            value={formdata.productname}
            className="p-3 border rounded-lg focus:outline-none"
            onChange={handlechange}
          />
          <input
            type="text"
            placeholder="Product Category"
            id="productcategory"
            value={formdata.productcategory}
            className="p-3 border rounded-lg focus:outline-none"
            onChange={handlechange}
          />
          <input
            type="number"
            placeholder="Product Price"
            id="productprice"
            value={formdata.productprice}
            className="p-3 border rounded-lg focus:outline-none"
            onChange={handlechange}
          />
          <input
            type="number"
            min={1}
            placeholder="Product Quantity"
            id="productquantity"
            value={formdata.productquantity}
            className="p-3 border rounded-lg focus:outline-none"
            inputMode="numeric"
            onChange={handlechange}
          />
          <input
            type="number"
            min={1}
            placeholder="Initial Product Quantity"
            id="initailquantity"
            value={formdata.initailquantity}
            className="p-3 border rounded-lg focus:outline-none"
            inputMode="numeric"
            onChange={handlechange}
          />
          <input
            type="text"
            placeholder="Product Description"
            id="productdescription"
            value={formdata.productdescription}
            className="p-3 border rounded-lg focus:outline-none"
            onChange={handlechange}
          />
          <button className="p-3 border uppercase text-xl font-semibold bg-blue-600 rounded-lg hover:opacity-75 text-white transition duration-300">
            ADD
          </button>
        </form>
      </div>

      {prevProducts.length > 0 ? (
        <div className="max-w-5xl mx-auto overflow-x-auto p-3 mt-5">
          <table className="w-full border-collapse border border-yellow-400">
            <thead>
              <tr className="bg-blue-500 text-white font-semibold">
                <th className="py-2 px-4 border-r border-b">ID</th>
                <th className="py-2 px-4 border-r border-b">Name</th>
                <th className="py-2 px-4 border-r border-b ">Quantity</th>
                <th className="py-2 px-4 border-r border-b">Price</th>
                <th className="py-2 px-4 border-r border-b ">Category</th>
                <th className="py-2 px-4 border-b">Action</th>
              </tr>
            </thead>
            <tbody>
              {prevProducts.map((product) => (
                <tr
                  key={product._id}
                  className="text-center border-b border-black  hover:bg-[#FFDFDF] hover:scale-105 transition duration-300"
                >
                  <td className="py-2 px-4 border-r">{product.productID}</td>
                  <td className="py-2 px-4 border-r">{product.productname}</td>
                  <td className="py-2 px-4 border-r ">
                    {product.productquantity}
                  </td>
                  <td className="py-2 px-4 border-r">{product.productprice}</td>
                  <td className="py-2 px-4 border-r ">
                    {product.productcategory}
                  </td>
                  <td className="py-2 px-4 my-5 ">
                    <div className="flex flex-col p-3 gap-2 ">
                      <Link
                        to={`/editproduct/${product._id}`}
                        className="p-3 border bg-stone-500 rounded-lg font-semibold text-white hover:opacity-80 "
                      >
                        Edit
                      </Link>
                      <button
                        className="p-3 border bg-red-500 rounded-lg font-semibold text-white hover:opacity-80"
                        onClick={() => handleDelete(product._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="font-semibold text-xl text-center mt-6">
          No Products Is Listed
        </p>
      )}
    </div>
  );
}
