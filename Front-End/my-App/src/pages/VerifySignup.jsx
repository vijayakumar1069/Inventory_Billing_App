import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function VerifySignup() {
  const [error, setError] = useState(false);
  const [result, setResult] = useState(false);
  console.log(useParams())
  const { id, token } = useParams();

  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  console.log(id, token);
  useEffect(() => {
    const fetching = async () => {
      const res = await fetch(
        `/api/admin/verify/${id}/${token}`
      );
      const data = await res.json();
      console.log(data)
      if (data.success == false) {
        setError(data.message);
        return;
      }
      setSuccess(data.verified);
    };
    fetching();
  }, [id, token]);
 
  console.log(success);

  const handlesubmit = async () => {
    console.log("hello this is verify User");

    if (success) {
      navigate("/dashboard");
    } else {
      // Handle the case when verification fails
      console.log("verify failed");
    }
  };

  return (
    <>
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
    </>
  );
}

