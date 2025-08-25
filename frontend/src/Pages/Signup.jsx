import React, {  useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Ghost, Loader2 } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
   const BASE_URL = import.meta.env.VITE_BACK_URL
  const navigate = useNavigate();
  const [password, showPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("form submitted", formData);

    try {
      setIsLoading(true);
      const res = await axios.post(
        `${BASE_URL}user/register`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Response from server:", res.data);
      if (res.data.success) {
        setFormData({ username: "", email: "", password: "" });
        toast.success(res.data.message || "Account created successfully");
        navigate(`/verify-otp/${formData.email}`);
      }
    } catch (error) {
      console.log("Error response from server:", error.response?.data);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-green-100">
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="md:w-full w-[85%] max-w-sm space-y-4 ">
          {/* Title & Form */}
          <div className="text-center">
            <h1 className="text-2xl md:text-3xl font-bold text-green-600 ">
              Create Your Account
            </h1>
            <p className="text-gray-600 text-sm md:text-base">
              Start your thoughts and ideas today
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <Card className="w-full bg-white">
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl text-center text-green-600">
                  Sign Up
                </CardTitle>
                <CardDescription className="text-center text-gray-600 text-sm md:text-base">
                  Create account and get Notes App
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-3">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      required
                      onChange={handleChange}
                      name="username"
                      value={formData.username}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      required
                      onChange={handleChange}
                      name="email"
                      value={formData.email}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={password ? "text" : "password"}
                        required
                        placeholder="*********"
                        onChange={handleChange}
                        name="password"
                        value={formData.password}
                      />
                      <Button
                        type="button"
                        variant={Ghost}
                        size="small"
                        className="absolute top-0 right-0 px-3 py-2 h-full hover:bg-transparent"
                        onClick={() => showPassword(!password)}
                        disabled={isLoading}
                      >
                        {password ? (
                          <Eye className="h-4 w-4 text-gray-600" />
                        ) : (
                          <EyeOff className="h-4 w-4 text-gray-600" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex-col gap-2">
                <Button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-500 "
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating account...
                    </>
                  ) : (
                    <div className="text-white">Sign Up</div>
                  )}
                </Button>
                <p className="text-sm text-gray-600 mt-2 text-[13px] md:text-base">
                  If have an already account?{" "}
                  <Link
                    to="/signin"
                    className="text-green-600 font-medium hover:underline"
                  >
                    Sign In
                  </Link>
                </p>
              </CardFooter>
            </Card>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
