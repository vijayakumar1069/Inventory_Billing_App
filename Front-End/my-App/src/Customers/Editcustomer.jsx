import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function Editcustomer() {
  const [formdata, setFormdata] = useState({
    customerID: 0,
    name: "",
    email: "",
    address: "",
  });
  const navigate = useNavigate();
  const params = useParams();
  const id = params.id;
  const [error, setError] = useState(false);

  const handlechange = async (e) => {
    setFormdata({ ...formdata, [e.target.id]: e.target.value });
  };
  useEffect(() => {
    const fetching = async () => {
      const res = await fetch(`/api/customers/editcustomer/${id}`);
      const data = await res.json();
      if (data.success == false) {
        console.log(data.message);
        setError(data.message);
      }
      setError(false);
      setFormdata(data);
      console.log(data);
      
    };

    fetching();
  }, [id]);

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/customers/updatecustomer/${id}`, {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      });
      const data = await res.json();
      if (data.success === false) {
        setError(data.message);
        return console.log(data.message);
      }
      setFormdata(data);
      setError(false);
      navigate("/customer");
    } catch (error) {
      setError(error.message);
      console.log(error.message);
    }
  };
  return (
    <>
      <div className="flex flex-col my-10 mx-auto max-w-32 items-center sm:w-2/3 md:w-3/4 ">
        <h1 className="text-3xl p-3 font-semibold">Customer Details</h1>
        <form
          className="flex gap-4 flex-col sm:w-2/3 md:w-3/4 "
          onSubmit={handlesubmit}
        >
          <input
            type="number"
            id="customerID"
            placeholder="CustomerID"
            className="border p-3 rounded-lg"
            onChange={handlechange}
            value={formdata.customerID}
          />
          <input
            type="text"
            id="name"
            placeholder="name"
            className="border p-3 rounded-lg"
            onChange={handlechange}
            value={formdata.name}
          />
          <input
            type="email"
            id="email"
            placeholder="email"
            className="border p-3 rounded-lg"
            onChange={handlechange}
            value={formdata.email}
          />
          <input
            type="text"
            id="address"
            placeholder="address"
            className="border p-3 rounded-lg"
            onChange={handlechange}
            value={formdata.address}
          />
          <button className="border bg-blue-900 p-3 rounded-lg">UPDATE</button>
          {error && (
            <p className="text-sm font-semibold p-3 text-center text-red-600">
              {error}
            </p>
          )}
        </form>
      </div>
    </>
  );
}
