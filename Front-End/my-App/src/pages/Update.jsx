import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updated, logout } from "../redux/adminSlice.js";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header.jsx";

export default function Update() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.admin);
  const [formdata, setFormdata] = useState({});
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const handlechange = (e) => {
    setFormdata({
      ...formdata,
      [e.target.id]: e.target.value,
    });
  };
  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch(`/api/admin/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      });
      const data = await res.json();
      console.log(data);
      if (data.message === false) {
        setLoading(false);
        setError(data.message);
      }
      console.log(data);
      setSuccess(true);

      dispatch(updated(data));
      setLoading(false);
      setError(false);
      navigate("/dashboard");
    } catch (error) {
      setSuccess(false);
      setLoading(false);
      console.log(error);
    }
  };
  const handledelete = async () => {
    try {
      console.log("delete finished")
      const res = await fetch(`/api/admin/logout`);

      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      dispatch(logout());
      navigate("/")
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="flex flex-col items-center max-w-screen-md rounded-lg bg-gradient-to-b from-slate-600 via-slate-400 to-slate-200 mx-auto mt-10 p-5 shadow-lg">
    <h1 className="text-3xl uppercase font-bold text-white mb-5">Profile</h1>
    <form className="flex flex-col w-full md:w-96 gap-5" onSubmit={handlesubmit}>
      {/* Username Input */}
      <input
        type="text"
        id="username"
        defaultValue={currentUser.username}
        className="border p-3 rounded-lg focus:outline-none focus:ring focus:border-blue-300 transition duration-300 text-black"
        onChange={handlechange}
        placeholder="Username"
      />
      {/* Email Input */}
      <input
        type="email"
        id="email"
        value={currentUser.email}
        className="border p-3 rounded-lg focus:outline-none focus:ring focus:border-blue-300 transition duration-300 text-black"
        onChange={handlechange}
        placeholder="Email"
      />
      {/* Password Input */}
      <input
        type="password"
        id="password"
        className="border p-3 rounded-lg focus:outline-none focus:ring focus:border-blue-300 transition duration-300 text-black"
        onChange={handlechange}
        placeholder="Password"
      />
      {/* Update Button */}
      <button
        className="uppercase bg-blue-700 p-3 rounded-lg hover:opacity-80 cursor-pointer transition duration-300"
      >
        Update
      </button>
      {/* Logout Button */}
      <button
        type="button"
        onClick={handledelete}
        className="uppercase bg-red-700 p-3 rounded-lg hover:opacity-80 cursor-pointer transition duration-300"
      >
        Logout
      </button>
      {/* Success Message */}
      {success && (
        <p className="text-lg font-semibold text-center text-green-300">
          Updated successfully...
        </p>
      )}
      {/* Error Message */}
      {error && (
        <p className="text-sm font-semibold text-center text-red-300">
          {error}
        </p>
      )}
    </form>
  </div>
  
  );
}
