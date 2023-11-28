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

      navigate("/home");
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };
  return (
    <div className="flex  mt-20 p-10 max-w-sm  sm:max-w-md lg:max-w-2xl   flex-col mx-auto">
      <div className="bg-slate-200 p-3  ">
        <h1 className="text-3xl text-center bg-slate-400 p-3 rounded-lg">
          Welcome to <span className="text-dc2626">VIJAY'S Billing APP</span>
        </h1>
      </div>
      <div className="flex flex-col md:flex-row p-5 gap-5 items-center mt-10  bg-slate-800 rounded-lg">
        <div className="w-full md:w-1/2    object-cover  md:border-slate-400  md:border-r-4">
          <img
            src="https://images.unsplash.com/photo-1487611459768-bd414656ea10?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGZvcm18ZW58MHx8MHx8fDA%3D"
            alt="Signup Image"
            className="max-w-full h-auto  "
          />
        </div>
        <div className="p-1 w-full md:w-1/2 flex gap-1 flex-col">
          <form className="flex flex-col gap-2" onSubmit={handlesubmit}>
            <input
              type="text"
              placeholder="Username"
              id="username"
              className="p-3 rounded-lg border"
              onChange={handlechange}
            />
            <input
              type="email"
              placeholder="Email..."
              id="email"
              className="p-3 rounded-lg border"
              onChange={handlechange}
            />
            <input
              type="password"
              placeholder="Password"
              id="password"
              className="p-3 rounded-lg border"
              onChange={handlechange}
            />
            <button className="bg-blue-500 text-white p-3 rounded-lg  uppercase hover:opacity-80 ">
              {loading ? "Registering..." : "resgister"}
            </button>
          </form>
          {error && (
            <p className="text-red-800 p-2 text-center font-semibold">
              {error}
            </p>
          )}
        
          <p className="text-white p-1 text-center ">If you Have an Account   <Link to="/login"><span className="text-red-800 font-semibold uppercase p-2">  Login </span>
            </Link></p>

         
        </div>
      </div>
    </div>
  );
}
