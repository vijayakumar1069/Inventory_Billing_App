import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export default function Customer() {
  const [formdata, setFormdata] = useState({
    customerID: 0,
    name: "",
    email: "",
    address: "",
  });
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.admin);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [customer, setCustomer] = useState([]);
  useEffect(() => {
    const fetching = async () => {
      const res = await fetch(
        `/api/customers/getallcustomer/${currentUser._id}`
      );
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      setCustomer(data);
    };
    fetching();
  }, [currentUser._id]);
  console.log(customer);

  const handlechange = (e) => {
    setFormdata({ ...formdata, [e.target.id]: e.target.value });
  };
  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/customers/addcustomer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formdata),
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        setLoading(false);
        setError(data.message);
        return;
      }
      setCustomer([data, ...customer]);
      setLoading(false);
      setError(false);
      setFormdata(data);
    } catch (error) {
      console.log(error.message);
      setError(error.message);
      setLoading(false);
    }
  };
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/customers/deletecustomer/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      setCustomer(customer.filter((cus) => cus._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex flex-col w-full p-3 gap-5 sm:w-2/3 sm:mx-auto">
        <h1 className="text-3xl p-3 font-semibold text-center">
          Customer Details
        </h1>
        <form className="flex flex-col gap-5 w-full flex-1" onSubmit={handlesubmit}>
          <input
            type="number"
            id="customerID"
            placeholder="Customer ID"
            className="border p-3 rounded-lg"
            onChange={handlechange}
          />
          {error && (
            <p className="text-sm font-semibold text-center text-red-600 uppercase">
              {error}
            </p>
          )}
          <input
            type="text"
            id="name"
            placeholder="Name"
            className="border p-3 rounded-lg"
            onChange={handlechange}
          />
          <input
            type="email"
            id="email"
            placeholder="Email"
            className="border p-3 rounded-lg"
            onChange={handlechange}
          />
          <input
            type="text"
            id="address"
            placeholder="Address"
            className="border p-3 rounded-lg"
            onChange={handlechange}
          />
          <button
            disabled={loading}
            className="border bg-blue-900 p-3 rounded-lg text-white font-semibold hover:opacity-80"
          >
            {loading ? "ADDING" : "ADD CUSTOMER"}
          </button>
        </form>
      </div>

      {customer.length > 0 ? (
        <div className="max-w-full overflow-x-auto p-3">
          <table className="table-auto w-full border-collapse border">
            <thead>
              <tr className="bg-blue-500 text-white font-semibold">
                <th className="py-2 px-4 border-r border-b hidden sm:table-cell">Id</th>
                <th className="py-2 px-4 border-r border-b">Name</th>
                <th className="py-2 px-4 border-r border-b hidden sm:table-cell">Email</th>
                <th className="py-2 px-4 border-r border-b hidden sm:table-cell">Address</th>
                <th className="py-2 px-4 border-r border-b">Total Orders</th>
                <th className="py-2 px-4 border-b">Action</th>
              </tr>
            </thead>
            <tbody>
              {customer.map((cus) => (
                <tr
                  key={cus._id}
                  className="text-center border-b border-black  hover:bg-[#FFDFDF] hover:scale-105 transition duration-300 sm:table-row"
                >
                  <td className="py-2 px-4 border-r hidden sm:table-cell">{cus.customerID}</td>
                  <td className="py-2 px-4 border-r">{cus.name}</td>
                  <td className="py-2 px-4 border-r hidden sm:table-cell">{cus.email}</td>
                  <td className="py-2 px-4 border-r hidden sm:table-cell">{cus.address}</td>
                  <td className="py-2 px-4 border-r">
                    {cus.previouslyOrderedProducts.length}
                  </td>
                  <td className="py-2 px-4 my-5 sm:my-0">
                    <div className="flex flex-col p-3 gap-2 ">
                      <Link
                        to={`/editcustomer/${cus._id}`}
                        className="p-3 border bg-stone-500 rounded-lg font-semibold text-white hover:opacity-80"
                      >
                        Edit
                      </Link>
                      <button
                        className="p-3 border bg-red-500 rounded-lg font-semibold text-white hover:opacity-80"
                        onClick={() => handleDelete(cus._id)}
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
        <p className="text-center mt-6 font-semibold">No customer is created </p>
      )}
    </div>
  );
}
