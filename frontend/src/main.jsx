import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Toaster } from "sonner";
import { UserProvider } from "./Context/ContextApi";

createRoot(document.getElementById("root")).render(
  <>
    <UserProvider>
      <App />
      <Toaster />
    </UserProvider>
  </>
);
