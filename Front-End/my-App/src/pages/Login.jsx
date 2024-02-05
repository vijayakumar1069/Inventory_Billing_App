import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loginstart } from "../redux/adminSlice.js";

export default function Login() {
  const [formdata, setFormdata] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const navigate = useNavigate();
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
      const res = await fetch("https://inventory-app-01.onrender.com/api/admin/login", {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return setError(data.message);
      }
      dispatch(loginstart(data));

      setError(false);
      navigate("/dashboard");
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    }
  };
  return (
    <div className="flex flex-col max-w-sm mt-20 md:mt-28 p-3 mx-auto md:max-w-2xl lg:max-w-3xl rounded-lg">
      <div className="bg-gray-950 text-white p-3 text-center rounded-lg text-2xl">
        <h1>
          Welcome to{" "}
          <span className="text-orange-600 font-semibold">
            VIJAY's Billing App
          </span>
        </h1>
      </div>
      <div className="flex flex-col mt-10 p-5 gap-5 bg-purple-100 shadow-md md:shadow-lg lg:shadow-2xl rounded-t-xl md:flex-row">
        <div className="md:w-1/2 p-3">
          <img
            className="w-full h-full rounded-lg"
            src="https://images.unsplash.com/photo-1529539795054-3c162aab037a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bG9naW58ZW58MHx8MHx8fDA%3D"
            alt="Login image"
          />
        </div>
        <div className="md:border-r-2 md:border-pink-700"></div>
        <div className="h-full">
          <form className="flex flex-col gap-6" onSubmit={handlesubmit}>
            {/* Email Input */}
            <input
              type="email"
              placeholder="Email"
              id="email"
              className="border p-3 rounded-lg focus:outline-none focus:ring focus:border-blue-300 transition duration-300"
              onChange={handlechange}
            />
            {/* Password Input */}
            <input
              type="password"
              placeholder="Password"
              id="password"
              className="border p-3 rounded-lg focus:outline-none focus:ring focus:border-blue-300 transition duration-300"
              onChange={handlechange}
            />
            {/* Login Button */}
            <button className="bg-blue-800 p-3 rounded-lg uppercase text-white hover:opacity-80 transition duration-300">
              Login
            </button>
            {/* Error Message */}
            {error && (
              <p className="text-center font-semibold text-sm text-red-800">
                {error}
              </p>
            )}
            {/* Sign Up Link */}
            <Link
              to={`/reset-password`}
              type="button"
              className="p-3 text-center rounded-lg bg-slate-600 text-white font-semibold hover:opacity-80"
            >
              Reset password
            </Link>
            <p className="text-center">
              If you don't have an account{" "}
              <Link to="/signup">
                <span className="font-semibold text-red-800 hover:underline">
                  SIGN UP
                </span>
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
