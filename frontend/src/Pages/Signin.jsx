import React, { useContext, useState, useEffect } from "react";
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
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Ghost, Loader2 } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { Link, useNavigate, useSearchParams } from "react-router-dom"; // ✅ useSearchParams add karo
import { UserContext } from "@/Context/ContextApi";

const Signin = () => {
  const BASE_URL = import.meta.env.VITE_BACK_URL;
  const { setUser } = useContext(UserContext);
  const [password, setPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams(); // ✅ URL parameters read karne ke liye
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // ✅ URL se messages check karo
  useEffect(() => {
    const message = searchParams.get('message');
    const error = searchParams.get('error');
    
    if (message) {
      toast.success(message);
    }
    if (error) {
      toast.error(error);
    }
  }, [searchParams]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const res = await axios.post(`${BASE_URL}/user/login`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.data.success) {
        setFormData({ email: "", password: "" });
        toast.success(res.data.message || "Signed in successfully");
        setUser(res.data.user);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        localStorage.setItem("accessToken", res.data.accessToken);
        navigate("/");
      }
    } catch (error) {
      console.log("internal error", error.response?.data);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-screen bg-green-100 overflow-hidden">
      <div className="flex flex-col items-center justify-center h-full">
        <div className="md:w-full w-[80%] max-w-sm space-y-3 md:space-y-3">
          {/* Title & Form */}
          <div className="text-center">
            <h1 className="text-2xl md:text-3xl font-bold text-green-600 ">
              Login Your Account
            </h1>
            <p className="text-gray-600 text-sm md:text-base">
              Start your thoughts and ideas today
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <Card className="w-full bg-white">
              <CardHeader className="md:space-x-1">
                <CardTitle className="text-2xl text-center text-green-600">
                  Sign In
                </CardTitle>
                <CardDescription className="text-center text-gray-600">
                  Signin your account to get started with Notes App
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-6">
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
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                      <Link
                        to="/forgot-password"
                        className="ml-auto font-medium tracking-tight text-[12px] text-green-600 inline-block text-sm font-sans underline-offset-4 hover:underline"
                      >
                        Forgot your password?
                      </Link>
                    </div>
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
                        onClick={() => setPassword(!password)}
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
                      Logging account...
                    </>
                  ) : (
                    <div className="text-white">Sign In</div>
                  )}
                </Button>

                <p className="text-sm text-gray-600 mt-3 text-[13px] md:text-base">
                  Don't have an account?{" "}
                  <Link
                    to="/signup"
                    className="text-green-600 font-medium hover:underline "
                  >
                    Create one
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

export default Signin;