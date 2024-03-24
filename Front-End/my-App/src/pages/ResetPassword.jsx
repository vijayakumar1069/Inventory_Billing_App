import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const [formdata, setFormdata] = useState({ email: "" });
  const [result, setResult] = useState(false);
  console.log(formdata);
  const navigate = useNavigate();
  const handlesubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:3000/api/admin/reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formdata),
    });
    const data = await res.json();
    if (data.success == false) {
      console.log(data.message);
      return;
    }
    setResult("Mail Sent Successfully");
  };
  const handleback = (e) => {
    e.preventDefault(e);
    navigate("/login");
  };
  return (
    <div className="min-h-screen flex items-center justify-center ">
      <form
        onSubmit={handlesubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
      >
        <h1 className="text-2xl font-semibold mb-4 text-center text-gray-800">
          Reset Your Password
        </h1>
        <input
          type="email"
          placeholder="Enter your Email"
          className="p-3 border rounded-lg w-full mb-4 focus:outline-none focus:ring focus:border-blue-300"
          onChange={(e) => setFormdata({ email: e.target.value })}
        />
        <button className="rounded-lg p-3 bg-blue-500 hover:opacity-80 text-white font-semibold w-full">
          Get Link
        </button>
        {result && (
          <p className="text-center font-semibold p-2 text-green-700">
            {result}
          </p>
        )}
        <button
          type="button"
          onClick={handleback}
          className="rounded-lg p-3 bg-[#5F8670] hover:bg-[#456450] hover:opacity-80 text-white font-semibold w-full mt-4"
        >
          Back
        </button>
      </form>
    </div>
  );
}
