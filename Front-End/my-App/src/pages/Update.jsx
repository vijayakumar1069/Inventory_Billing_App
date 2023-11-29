import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updated } from "../redux/adminSlice.js";
import { useNavigate } from "react-router-dom";

export default function Update() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.admin);
  const [formdata, setFormdata] = useState({
    username: currentUser.username,
    email: currentUser.email,
    password: "",
  });
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
  return (
    <div className="flex flex-col items-center max-w-sm sm:max-w-xl md:max-w-2xl rounded-lg bg-slate-400 mx-auto mt-10 p-5 ">
      <h1 className="text-2xl uppercase font-bold text-black">Profile</h1>
      <form className="flex flex-col mt-5 gap-5" onSubmit={handlesubmit}>
        <input
          type="text"
          id="username"
          value={formdata.username}
          className="border p-3 rounded-lg "
          onChange={handlechange}
        />
        <input
          type="email"
          id="email"
          value={formdata.email}
          className="border p-3 rounded-lg "
          onChange={handlechange}
        />
        <input
          type="password"
          id="password"
          className="border p-3 rounded-lg "
          onChange={handlechange}
        />
        <button className="border bg-blue-700 p-3 rounded-lg hover:opacity-80 cursor-pointer">
          Update
        </button>
        {success && (
          <p className="text-lg font-semibold text-center text-green-800">
            updated successfully...
          </p>
        )}
        {error && (
          <p className="text-sm font-semibold text-center text-red-800">
            {error}
          </p>
        )}
      </form>
    </div>
  );
}
