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
      const res = await fetch(`/api/admin/verify/${id}/${token}`);
      const data = await res.json();

      if (data.success === false) {
        setError(data.message);
        return;
      }
      setSuccess(data.verified);
    };
    fetching();
  }, [id, token]);

  const handlesubmit = async () => {
    if (success) {
      navigate("/dashboard");
    } else {
      // Handle the case when verification fails
      console.log("verify failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <button
        onClick={handlesubmit}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Verify
      </button>
      {error && (
        <p className="text-red-800 p-2 text-center font-semibold">{error}</p>
      )}
      {result && (
        <p className="text-green-800 p-2 text-center font-semibold">{result}</p>
      )}
    </div>
  );
}
