import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const NewPassword = () => {
  const { userId, token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState(false);
  const [result, setResult] = useState(false);
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    console.log("User ID:", userId);
    console.log("Token:", token);
  }, [userId, token]);
  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmNewPasswordChange = (e) => {
    setConfirmNewPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      setError("Both Password Must be Same");
      return;
    }
    const res = await fetch(`http://localhost:3000/api/admin/newpassword/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ newPassword, confirmNewPassword }),
    });
    const data = await res.json();
    if (data.success === false) {
      setError(data.message);
      return;
    }

    setResult("password updated....");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          Set New Password
        </h2>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            New Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="newPassword"
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={handleNewPasswordChange}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Confirm New Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="confirmNewPassword"
            type="password"
            placeholder="Confirm new password"
            value={confirmNewPassword}
            onChange={handleConfirmNewPasswordChange}
            required
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Set Password
          </button>
        </div>
        {error && (
          <p className="text-center text-red-600 font-semibold p-3 mt-3">
            {error}
          </p>
        )}
        {result && (
          <p className="text-center text-green-600 font-semibold p-3 mt-3">
            {result}
          </p>
        )}
      </form>
    </div>
  );
};

export default NewPassword;
