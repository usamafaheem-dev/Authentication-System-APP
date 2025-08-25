import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const Verify = () => {
  const BASE_URL = import.meta.env.VITE_BACK_URL;
  const { token } = useParams();
  const [status, setStatus] = useState("Verifying your email...");
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const res = await axios.get(`${BASE_URL}user/verify/${token}`);
        
        if (res.data.success) {
          setStatus("✅ Email Verified Successfully!");
          setIsSuccess(true);
          toast.success(res.data.message || "Email verified successfully");
          
          // 2 seconds baad automatically login page redirect
          setTimeout(() => {
            navigate("/signin");
          }, 2000);
        } else {
          setStatus("❌ Invalid or Expired Token");
          toast.error(res.data.message || "Invalid or expired token");
        }
      } catch (error) {
        console.log(error);
        setStatus("❌ Verification Failed");
        toast.error(error.response?.data?.message || "Something went wrong");
        
        // 3 seconds baad automatically signup page redirect
        setTimeout(() => {
          navigate("/signup");
        }, 3000);
      }
    };

    if (token) {
      verifyEmail();
    } else {
      setStatus("❌ No verification token provided");
      toast.error("Invalid verification link");
      setTimeout(() => {
        navigate("/signup");
      }, 3000);
    }
  }, [token, navigate, BASE_URL]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-[90%] max-w-md text-center">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">
          {status}
        </h2>
        
        {isSuccess ? (
          <div>
            <p className="text-green-600 mb-4">Redirecting to login page...</p>
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
          </div>
        ) : (
          <div>
            <p className="text-red-600 mb-4">Redirecting to signup page...</p>
            <button 
              onClick={() => navigate("/signup")}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 mt-4"
            >
              Go to Signup Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Verify;