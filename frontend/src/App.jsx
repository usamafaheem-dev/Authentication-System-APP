import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./Pages/Signup";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Navbar from "./components/Navbar";
import Home from "./Pages/Home";
import EmailVerifyOtp from "./Pages/EmailVerifyOtp";
import Signin from "./Pages/Signin";
import ForgetPassword from "./Pages/ForgetPassword";
import PasswordVerifyOtp from "./Pages/ForgetPasswordOtpVerify";
import ChangePassword from "./Pages/ChangePassword";

import NotFound from "./Pages/PageNotFound";

// import ProtectedRoutes from "./components/ProtectedRoutes";

const router = createBrowserRouter([
  {
    path: "signup",
    element: <Signup />,
  },
  {
    path: "/",
    element: (
      <>
        <ProtectedRoutes>
          <Navbar />
          <Home />
        </ProtectedRoutes>
      </>
    ),
  },

  {
    path: "/verify-otp/:email",
    element: <EmailVerifyOtp />,
  },
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/forgot-password",
    element: <ForgetPassword />,
  },
  {
    path: "/verify/password/otp/:email",
    element: <PasswordVerifyOtp />,
  },
  {
    path: "/change-password/:email",
    element: <ChangePassword />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
