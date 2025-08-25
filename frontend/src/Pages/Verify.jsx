import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const Verify = () => {
  const BASE_URL_ = import.meta.env.VITE_API_URL;
  const { token } = useParams();
  const [status, setStatus] = useState("Verifying.....");
  const navigate = useNavigate();

  useEffect(() => {
    const VerifyEmail = async () => {
      try {
        const res = await axios.post(
          `${BASE_URL_}/user/user/verify`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res.data.success) {
          setStatus("✅ Email Verified Successfully");
          toast.success(res.data.message || "Email verified successfully");
          setTimeout(() => {
            navigate("/signin");
          }, 2000);
        } else {
          setStatus(" ❌Invalid or Expire Token");
          toast.error(res.data.message || "Invalid or expired token");
        }
      } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.message || "Something went wrong");
        setStatus("❌ Verification failed.Please try again");
      }
    };

    VerifyEmail();
  }, [token, navigate]);

  return (
    <div className="relative w-full h-[100%] overflow-hidden">
      <div className="min-h-screen flex items-center justify-center px-4 bg-green-100">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-[90%] max-w-md text-center">
          <h2
            className="font-semibold text-sm md:text-xl text-gray-800"
            style={{ fontFamily: "cursive" }}
          >
            {status}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Verify;
