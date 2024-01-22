import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { loginstart } from "../redux/adminSlice.js";
export default function VerifySignup() {
  const [error, setError] = useState(false);
  const [result, setResult] = useState(false);
  const { id, token } = useParams();
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.admin);
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetching = async () => {
      try {
        const res = await fetch(`/api/admin/verify/${id}/${token}`);
        const data = await res.json();

        if (data.success === false) {
          setError(data.message);
        } else {
          setSuccess(true);
        }
      } catch (error) {
        setError("An error occurred during verification");
      }
    };

    fetching();
  }, [id, token]);
  console.log(user);

  const handlesubmit = async () => {
    const res = await fetch(`/api/admin/verificationstatus/${id}/${token}`);
    const data = await res.json();
    if (data.success === false) {
      setError(data.message);
      return;
    }
    console.log(data);
    dispatch(loginstart(data));
    navigate("/dashboard");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Account Verification</h2>

        <p className="mb-4">
          Thank you for registering. Please click the button below to verify
          your account:
        </p>

        <button
          onClick={handlesubmit}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Verify
        </button>

        {error && <p className="text-red-800 mt-4 font-semibold">{error}</p>}
        {result && (
          <p className="text-green-800 mt-4 font-semibold">
            Verification successful
          </p>
        )}
      </div>
    </div>
  );
}
