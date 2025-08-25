import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const Verify = () => {
  const BASE_URL = import.meta.env.VITE_BACK_URL;
  
  const { token } = useParams();
  const [status, setStatus] = useState("Verifying.....");
  const navigate = useNavigate();

  useEffect(() => {
    const VerifyEmail = async () => {
      try {
        // ✅ CHANGE TO GET REQUEST
        const res = await axios.get(`${BASE_URL}user/verify/${token}`);
        
        if (res.data.success) {
          setStatus("✅ Email Verified Successfully");
          toast.success(res.data.message || "Email verified successfully");
          setTimeout(() => {
            navigate("/signin");
          }, 2000);
        } else {
          setStatus("❌ Invalid or Expired Token");
          toast.error(res.data.message || "Invalid or expired token");
        }
      } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.message || "Something went wrong");
        setStatus("❌ Verification failed. Please try again");
        
        // Optional: Redirect after error
        setTimeout(() => {
          navigate("/signup");
        }, 3000);
      }
    };

    if (token) {
      VerifyEmail();
    } else {
      setStatus("❌ No verification token provided");
      toast.error("Invalid verification link");
    }
  }, [token, navigate, BASE_URL]);

  return (
    <div className="relative w-full h-[100%] overflow-hidden">
      <div className="min-h-screen flex items-center justify-center px-4 bg-green-100">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-[90%] max-w-md text-center">
          <h2 className="font-semibold text-sm md:text-xl text-gray-800" style={{ fontFamily: "cursive" }}>
            {status}
          </h2>
          {status.includes("failed") && (
            <button 
              onClick={() => navigate("/signup")}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
            >
              Go to Signup
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Verify;