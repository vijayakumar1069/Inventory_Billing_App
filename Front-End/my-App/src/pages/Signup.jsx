import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const [formdata, setFormdata] = useState({
    username: "",
    password: "",
    email: "",
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handlechange = (e) => {
    setFormdata({ ...formdata, [e.target.id]: e.target.value });
  };
  console.log(formdata);
  console.log(error);
  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/admin/signup", {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      });
      const data = await res.json();

      if (data.success === false) {
        setLoading(false);
        return setError(data.message);
      }
      setLoading(false);
      setError(false);

      navigate("/dashboard");
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };
  return (
    <div className="flex mt-20 p-10 max-w-sm sm:max-w-2xl lg:max-w-4xl flex-col mx-auto">
    <div className="bg-slate-200 p-3">
      <h1 className="text-3xl text-center bg-violet-400 p-3 rounded-lg font-semibold">
        Welcome to <span className="text-dc2626">VIJAY'S Billing APP</span>
      </h1>
    </div>
    <div className="flex flex-col md:flex-row p-5 gap-3 mt-10 bg-slate-400 rounded-lg">
      <div className="md:w-full object-cover items-center p-1">
        <img
          src="https://images.unsplash.com/photo-1579444741963-5ae219cfe27c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Zm9ybXxlbnwwfHwwfHx8MA%3D%3D"
          alt="Signup Image"
          className="max-w-full h-full rounded-lg"
        />
      </div>
      <div className="md:border-r-2 md:border-pink-700"></div>
      <div className="p-1 w-full md:w-full flex gap-1 flex-col">
        <form className="flex flex-col gap-2" onSubmit={handlesubmit}>
          {/* Username Input */}
          <input
            type="text"
            placeholder="Username"
            id="username"
            className="p-3 rounded-lg border focus:outline-none focus:ring focus:border-blue-300 transition duration-300"
            onChange={handlechange}
          />
          {/* Email Input */}
          <input
            type="email"
            placeholder="Email..."
            id="email"
            className="p-3 rounded-lg border focus:outline-none focus:ring focus:border-blue-300 transition duration-300"
            onChange={handlechange}
          />
          {/* Password Input */}
          <input
            type="password"
            placeholder="Password"
            id="password"
            className="p-3 rounded-lg border focus:outline-none focus:ring focus:border-blue-300 transition duration-300"
            onChange={handlechange}
          />
          {/* Register Button */}
          <button className="bg-blue-500 text-white font-bold p-3 rounded-lg uppercase hover:opacity-80 transition duration-300">
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        {/* Error Message */}
        {error && (
          <p className="text-red-800 p-2 text-center font-semibold">
            {error}
          </p>
        )}
        {/* Login Link */}
        <p className="text-white p-1 text-center">
          If you have an account{" "}
          <Link to="/login">
            <span className="text-red-800 font-semibold uppercase p-2 hover:underline">
              Login
            </span>
          </Link>
        </p>
      </div>
    </div>
  </div>
  
  
  );
}
