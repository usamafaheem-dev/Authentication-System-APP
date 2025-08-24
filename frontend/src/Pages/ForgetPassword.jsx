import React, { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, CheckCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";

const ForgetPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Simple validation
    if (!email) {
      setError("Please enter your email address");
      setIsLoading(false);
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address");
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const res = await axios.post(
        "http://localhost:8000/user/forgetpassword",
        { email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.data.success) {
        setIsSubmitted(true); // Set to true to show success state
        toast.success(res.data.message || "Password reset link sent");
        setTimeout(() => {
          navigate(`/verify-otp/${email}`);
        }, 3000);
      }
    } catch (error) {
      console.log("internal error", error.response?.data);
      setError(error.response?.data?.message || "Something went wrong");
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-xl md:text-3xl font-bold tracking-tight text-green-600">
            Reset Your Password
          </h1>
          <p className="text-gray-600 text-sm md:text-base">
            Enter your email address and we'll send you instructions to reset
            your password
          </p>
        </div>

        <Card className="bg-white shadow-xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl md:text-2xl text-center text-green-600">
              Forgot Password
            </CardTitle>
            <CardDescription className="text-center">
              {isSubmitted
                ? "Check your email for reset instructions"
                : "Enter your email address to receive a password reset link"}
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

            {isSubmitted ? (
              // Success State
              <div className="py-6 flex flex-col items-center justify-center text-center space-y-4">
                <div className="bg-green-100 rounded-full p-3">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium text-lg">Check your inbox</h3>
                  <p className="text-gray-600">
                    We've sent a password reset link to{" "}
                    <span className="font-medium text-gray-900">{email}</span>
                  </p>
                  <p>
                    If you don't see the email, check your spam folder or{" "}
                    <button
                      className="text-green-600 hover:underline font-medium"
                      onClick={() => setIsSubmitted(false)}
                    >
                      try again
                    </button>
                  </p>
                </div>
              </div>
            ) : (
              // Form State
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-green-600 text-white  hover:bg-green-700"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>Sending...</>
                  ) : (
                    <>
                      <Mail className="mr-2 h-4 w-4" />
                      Send Reset Link
                    </>
                  )}
                </Button>
              </form>
            )}
          </CardContent>

          {!isSubmitted && (
            <div className="text-center hidden md:block pb-4">
              <p className="text-gray-600 text-sm md:text-base">
                Remember your password?{" "}
                <Link
                  to="/signin"
                  className="text-green-600 hover:underline font-medium"
                >
                  Back to login
                </Link>
              </p>
            </div>
          )}
        </Card>

        {!isSubmitted && (
          <div className="text-center md:hidden">
            <p className="text-gray-600 text-sm md:text-base">
              Remember your password?{" "}
              <Link
                to="/signin"
                className="text-green-600 hover:underline font-medium"
              >
                Back to login
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgetPassword;
