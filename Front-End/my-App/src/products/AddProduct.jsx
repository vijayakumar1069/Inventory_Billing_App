import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function AddProduct() {
  const { currentUser } = useSelector((state) => state.admin);
  const [prevProducts, setPrevProducts] = useState([]);
  const [formdata, setFormdata] = useState({
    productID: 0,
    productname: "",
    productdescription: "",
    productcategory: "",
    productquantity: 0,
    productprice: 0,
  });
  const [error, setError] = useState(false);
  useEffect(() => {
    const fetching = async () => {
      try {
        const res = await fetch(`/api/products/getproducts/${currentUser._id}`);
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
  console.log(prevProducts);

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
        setError(data.message);
        return;
      }
      setError(false);
      setPrevProducts([data, ...prevProducts]);
    } catch (error) {
      setError(data.message);
    }
  };
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/products/deleteproduct/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.message === false) {
        console.log(data.message);
      }

      setPrevProducts(prevProducts.filter((product) => product._id != id));
      console.log(data);
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
          {error && (
            <p className="text-center font-2xl font-semibold text-red-700">{error}</p>
          )}
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
            id="productquantity"
            placeholder="productquantity"
            className="p-3 border rounded-lg "
            inputMode="numeric"
            onChange={handlechange}
          />
          <input
            type="number"
            min={1}
            id="initailquantity"
            placeholder=" Initial productquantity "
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
      {prevProducts.length > 0 && (
        <div className="max-w-5xl mx-auto overflow-x-auto p-3">
          <table className="table-auto w-full border-collapse border border-yellow-400">
            <thead>
              <tr className="bg-blue-500 text-white font-semibold">
                <th className="py-2 px-4 border-r border-b">Id</th>
                <th className="py-2 px-4 border-r border-b">Name</th>
                <th className="py-2 px-4 border-r border-b">Quantity</th>
                <th className="py-2 px-4 border-r border-b">Price</th>
                <th className="py-2 px-4 border-r border-b">Category</th>

                <th className="py-2 px-4 border-b">Action</th>
              </tr>
            </thead>
            <tbody>
              {prevProducts.map((product) => (
                <tr
                  key={product._id}
                  className="text-center border-b border-black hover:bg-purple-300 "
                >
                  <td className="py-2 px-4 border-r">{product.productID}</td>
                  <td className="py-2 px-4 border-r">{product.productname}</td>
                  <td className="py-2 px-4 border-r">
                    {product.productquantity}
                  </td>
                  <td className="py-2 px-4 border-r">{product.productprice}</td>

                  <td className="py-2 px-4 border-r">
                    {product.productcategory}
                  </td>
                  <td className="py-2 px-4 my-5 ">
                    <div className="flex flex-col p-3 gap-2 ">
                      <Link
                        to={`/editproduct/${product._id}`}
                        className="p-3 border bg-stone-500 rounded-lg font-semibold text-white hover:opacity-80 "
                      >
                        <button>Edit</button>
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
      )}
    </div>
  );
}
