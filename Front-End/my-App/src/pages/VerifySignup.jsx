import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function VerifySignup() {
  const [error, setError] = useState(false);
  const [result, setResult] = useState(false);
  const { id, token } = useParams();
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetching = async () => {
      try {
        const res = await fetch(`/api/admin/verify/${id}/${token}`);
        const data = await res.json();

        if (data.verified === false) {
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

  const handlesubmit = () => {
    if (success) {
      setTimeout(() => {
        navigate("/dashboard");
      }, 3000);
    } else {
      console.log("Verification failed");
    }
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
