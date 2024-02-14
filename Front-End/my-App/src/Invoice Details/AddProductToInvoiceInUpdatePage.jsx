import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link, useParams,useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const AddProductToInvoiceInUpdatePage = () => {
  const { currentUser } = useSelector((state) => state.admin);
  const [currentproduct, setCurrentProduct] = useState({
    productID: 0,
    productname: "",
    productdescription: "",
    productcategory: "",
    productquantity: 1,
    productprice: 0,
  });
  const navigate=useNavigate()
  const params = useParams();
  const id = params.id;

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [totalprice, setTotalPrice] = useState(0);
  const [gstfortotalprice, setGstfortotalprice] = useState(0);
  const [toalamountwithgst, setToalamountwithgst] = useState(0);
  const [error, setError] = useState(false);
  const [prevProducts, setPrevProducts] = useState([]);
  console.log("currentproducts: " + currentproduct)
  const handlesearchProductID = async () => {
    try {
      const t=localStorage.getItem("access_token");
      const res = await fetch(
        `https://inventory-app-01.onrender.com/api/products/getproduct/${currentproduct.productID}/${currentUser._id}`,{
          headers:{
            Authorization: `Bearer ${t}`,
          }
        }
      );
      const data = await res.json();
      if (data.success === false) {
        setError(data.message);

        return;
      }
      setError(false);

      setCurrentProduct({ ...data.rest, productquantity: 1 });
    } catch (error) {
      setError(error.message);
    }
  };
  const handlechange = (e) => {
    setCurrentProduct({ ...currentproduct, [e.target.id]: e.target.value });
  };

  const hanldeaddmore = () => {
    if (currentproduct.productID === 0) {
      return setError("Enter Correct product ID");
    }

    setPrevProducts((prev) => [currentproduct, ...prev]);
    // This code will be executed after the state is updated
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
    let gstpern = 0.18;
    setGstfortotalprice(totalprice * gstpern);
  };

  // Function to calculate total amount with GST
  const calculateToalamountwithgst = () => {
    const totalAmountWithGst = totalprice + gstfortotalprice;
    setToalamountwithgst(totalAmountWithGst);
  };

  useEffect(() => {
    const fetching = async () => {
      try {
        const t=localStorage.getItem("access_token");
        const res = await fetch(
          `https://inventory-app-01.onrender.com/api/invoices/getproductsforexistinginvoice/${id}`,
          {
            headers:{
              Authorization: `Bearer ${t}`,
            }
          }
        );
        const data = await res.json();
        setPrevProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetching();
  }, [id]);

  useEffect(() => {
    currentproduct.productquantity = Number(currentproduct.productquantity);
    calculateTotalPrice();
  }, [currentproduct, prevProducts]);

  useEffect(() => {
    calculateGstfortotalprice();
  }, [totalprice]);

  useEffect(() => {
    calculateToalamountwithgst();
  }, [gstfortotalprice]);
  console.log(prevProducts);
  const handleupdateaddproduct = async (e) => {
    e.preventDefault();
    if (currentproduct.productID !== 0 && error === false) {
      prevProducts.push(currentproduct);

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
      setLoading(true);
      const t=localStorage.getItem("access_token");
      const res = await fetch(
        `https://inventory-app-01.onrender.com/api/invoices/addproductstoexistinginvoice/${id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json",
          Authorization: `Bearer ${t}`, },
          body: JSON.stringify({ prevProducts }),
        }
      );
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        setLoading(false);
      }
      setSuccess(true);
      setLoading(false);
      navigate(`/updateinvoice/${id}`)
    } catch (error) {
      console.log(error);
      setLoading(false);
      setSuccess(false);
    }
  };
  return (
    <div className="flex flex-col ">
      <h1 className="text-2xl p-3 my-5 text-center font-bold text-white">
        Add your Products
      </h1>
      <div className=" flex flex-col gap-4 flex-wrap p-2 ">
        <div className="flex flex-col gap-5">
          <div className=" flex gap-5 items-center">
            <label className="font-semibold w-32  text-white"> Product ID :</label>
            <input
              type="number"
              id="productID"
              placeholder="enter productID"
              className="rounded-lg p-3 border "
              onChange={handlechange}
              value={currentproduct.productID}
            />
            <FaSearch size={25} onClick={handlesearchProductID} className="bg-white rounded-md " />
          </div>
          <div className="">
            {" "}
            {error && (
              <p className=" p-2 font-semibold text-red-700">{error}</p>
            )}
          </div>
        </div>
        <div className="flex gap-5 items-center  ">
          <label className="font-semibold w-32 text-white">Product Name :</label>
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
          <label className="font-semibold w-32 text-white"> Description :</label>
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
          <label className="font-semibold w-32 text-white">category :</label>
 
          <input
            className="rounded-lg p-3 border w-full "
            type="text"
            id="productcategory"
            value={currentproduct.productcategory}
            placeholder="enter product Category"
          />
        </div>

        <div className="flex gap-5 items-center">
          <label className="font-semibold w-32  text-white">quantity : </label>
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
          <label className="font-semibold w-32 text-white">Price :</label>
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
                  <tr className="bg-slate-400">
                    {/* <th className="py-2  border-r border-l">Product ID</th> */}
                    <th className="py-2  border-r border-l">Name</th>
                    {/* <th className="py-2 border-r border-l">Category</th> */}
                    <th className="py-2  border-r border-l">Quantity</th>
                    <th className="py-2 border-r border-l">Price/Product</th>
                    <th className="py-2 border-r border-l">Total Price </th>
                  </tr>
                </thead>

                <tbody>
                  {prevProducts.map(
                    (product, index) =>
                      // Add a condition to check if the product is not empty
                      product.productID !== 0 && (
                        <tr key={index}>
                          {/* <td className="py-2 text-center border-r border-l   ">
                            {product.productID}
                          </td> */}
                          <td className="py-2  text-center border-r border-l ">
                            {product.productname}
                          </td>
                          {/* <td className="py-2 text-center border-r border-l ">
                            {product.productcategory}
                          </td> */}
                          <td className="py-2 text-center border-r border-l ">
                            {product.productquantity}
                          </td>
                          <td className="py-2 text-center border-r border-l ">
                            {product.productprice}
                          </td>
                          <td className="py-2 text-center border-r border-l ">
                            {product.productprice * product.productquantity}
                          </td>
                        </tr>
                      )
                  )}
                </tbody>
              </table>
              <div className="flex  mt-4 flex-col   ">
                <div className="text-right flex flex-col gap-6 p-3 ">
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
        <button
          className=" mt-3 rounded-lg bg-blue-800 p-3 text-white font-bold uppercase text-center "
          onClick={handleupdateaddproduct}
        >
          save
        </button>
      </div>
    </div>
  );
};
