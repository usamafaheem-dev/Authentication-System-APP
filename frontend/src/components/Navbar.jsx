import { BookA, BookOpen, LogOut, User } from "lucide-react";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserContext } from "@/Context/ContextApi";
import axios from "axios";
import { toast } from "sonner";
const Navbar = () => {
  const { user, setUser } = useContext(UserContext);
  console.log(user);
  const accessToken = localStorage.getItem("accessToken");

  const logoutHander = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8000/user/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (res.data.success) {
        setUser(null);
        toast.success(res.data.message);
        setUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="px-10 py-2 bg-transparent w-full">
      <div className="max-w-7xl mx-auto flex justify-between items-center ">
        {/* logo section */}
        <div className="flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-green-800" />
          <h1 className="font-bold text-xl ">
            <span className="text-green-600">Notes</span>App{" "}
          </h1>
        </div>
        {/* links */}
        <div className="flex gap-7 items-center">
          <ul className="flex gap-7 items-center text-lg font-semibold">
            <li>Features</li>
            <li>Pricing</li>
            <li>About</li>
            {user ? (
              <div className="">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Avatar className="cursor-pointer">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-white">
                    <DropdownMenuLabel className="cursor-pointer hover:bg-green-600 hover:text-white">
                      My Account
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className=" border-b-1" />
                    <DropdownMenuItem className="cursor-pointer hover:bg-green-600 hover:text-white">
                      <User /> Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer hover:bg-green-600 hover:text-white">
                      <BookA /> Notes
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className=" border-b-1 border-b-gray-400" />
                    <Link to="signin">
                      <DropdownMenuItem
                        onClick={logoutHander}
                        className="cursor-pointer hover:bg-red-600 hover:text-white"
                      >
                        <LogOut /> Logout
                      </DropdownMenuItem>
                    </Link>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <Link to="/signin">
                <li>Login</li>
              </Link>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
