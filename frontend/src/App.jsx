import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home";
import Signin from "./Pages/Signin";
import Signup from "./Pages/Signup";
import VerifyEmail from "./Pages/VerifyEmail";
import Verify from "./Pages/Verify";
import ForgetPassword from "./Pages/ForgetPassword";
import Navbar from "./components/Navbar";
import ProtectedRoutes from "./components/ProtectedRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
    <ProtectedRoutes>
         <Navbar />
        <Home />
    </ProtectedRoutes>
    ),
  },
  {
    path: "/verify",
    element: <VerifyEmail />,
  },
  {
    path: "/verify/:token",
    element: <Verify />,
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
    path: "signup",
    element: <Signup />,
  },
]);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
      {/* <PracticeSign/> */}
    </>
  );
};

export default App;
