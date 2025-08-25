import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { CheckCircle, Loader, Loader2, RotateCcw } from "lucide-react";
import React, { useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const EmailVerifyOtp = () => {
  // const BASE_URL = import.meta.env.VITE_BACK_URL;

  const [isVerified, setIsVerified] = useState(false); // Simulating a verified state for demonstration
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRefs = useRef([]);
  const { email } = useParams();
  const navigate = useNavigate();

  const handleChange = (index, value) => {
    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleVerify = async () => {
    const finalOTP = otp.join("");
    if (finalOTP.length !== 6) {
      setError("Please enter a valid 6-digit OTP.");
      return;
    }
    setIsLoading(true);
    try {
      // Simulate API call
      const res = await axios.post(
        `http://localhost:8000/user/verify/register/otp/${email}`,
        { email, otp: finalOTP },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.data.success) {
        setIsVerified(true); // Set to true to show success state
        toast.success(res.data.message || "Password reset link sent");
        setTimeout(() => {
          navigate(`/signin`);
        }, 2000);
      }

      setSuccessMessage("OTP verified successfully!");
      setIsVerified(true);
    } catch (error) {
      console.log("internal error", error.response?.data);
      setError(error.response?.data?.message || "Something went wrong");
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const otpClear = () => {
    setOtp(["", "", "", "", "", ""]);
    setError("");
    inputRefs.current[0]?.focus();
  };

  return (
    <div className="min-h-screen flex flex-col bg-green-100">
      {/* main content */}
      <div className="flex-1 flex items-center justify-center p-4 ">
        <div className="w-full max-w-md space-y-6 ">
          <div className="text-center space-y-2">
            <h1
              className="text-xl md:text-3xl font-bold tracking-tight text-green-600"
              style={{ fontFamily: "cursive" }}
            >
              Verify your email
            </h1>
            <p className="text-gray-600 text-sm md:text-base">
              We've have sent a 6-digit verification code to{" "}
              <span>{"your email"}</span>
            </p>
          </div>
          <Card className="shadow-lg bg-white border-0">
            <CardHeader>
              <CardTitle className="text-xl md:text-2xl text-center text-green-600">
                Enter verification code
              </CardTitle>
              <CardDescription className="text-center text-gray-600">
                {isVerified
                  ? "Code verified successfully! Redirecting..."
                  : "Please enter the 6 digit code we sent to your email."}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {error && (
                <Alert
                  variant="destructive"
                  className="bg-red-50 text-red-800 border-red-200"
                >
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              {successMessage && (
                <p className="text-sm text-green-500 mb-3 text-center">
                  {successMessage}
                </p>
              )}

              {isVerified ? (
                <div className="py-3 flex flex-col items-center justify-center text-center space-y-3">
                  <div className="bg-green-600/10 rounded-full p-3">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium text-lg">
                      Verification Successful
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Your email has been verified successfully! You will be
                      redirected to reset your password .
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Loader className="h-4 w-4 text-green-600 animate-spin" />
                    <span className="text-sm text-gray-600">
                      Redirecting...
                    </span>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex justify-center gap-2   md:justify-between md:gap-0 mb-6">
                    {otp.map((digit, index) => (
                      <Input
                        key={index}
                        maxLength={1}
                        onChange={(e) => handleChange(index, e.target.value)}
                        ref={(el) => (inputRefs.current[index] = el)}
                        className="h-12 w-12 text-center font-bold border-1  border-gray-500"
                        type="text"
                        value={digit}
                      />
                    ))}
                  </div>
                  <div className="space-y-3 flex justify-center flex-col text-white">
                    <Button
                      onClick={handleVerify}
                      disabled={isLoading || otp.some((digit) => digit === "")}
                      className="bg-green-600 w-full"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="animate-spin" /> Verifing...
                        </>
                      ) : (
                        "Verify Code"
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={otpClear}
                      className="bg-transparent w-full text-black hover:bg-green-600 hover:text-white"
                    >
                      <RotateCcw className="h-4 w-4  mr-2" />
                      Clear
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
            <CardFooter className="flex justify-center">
              <p className="text-center text-gray-600 text-sm">
                Didn't receive the code?{" "}
                <Link
                  to="/forgot-password"
                  className="font-medium text-green-600 hover:underline hover:"
                >
                  {" "}
                  Go back email page
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EmailVerifyOtp;
