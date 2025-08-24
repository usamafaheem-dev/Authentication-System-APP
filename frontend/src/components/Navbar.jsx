import { BookOpen, LogOut, User, BookA, Menu, X } from "lucide-react";
import React, { useContext, useState } from "react";
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const accessToken = localStorage.getItem("accessToken");

  const logoutHandler = async () => {
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
        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");
        setMobileMenuOpen(false); // Close mobile menu on logout
      }
    } catch (error) {
      console.log(error);
      toast.error("Logout failed. Please try again.");
    }
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="px-4 sm:px-6 lg:px-10 py-3 bg-green-50 shadow w-full sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo section */}
        <Link to="/" className="flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-green-600" />
          <h1 className="font-bold text-xl">
            <span className="text-green-600">Notes</span>App
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-7 items-center">
          <ul className="flex gap-7 items-center text-base font-medium">
            <li className="hover:text-green-600 transition-colors">
              <Link to="/">Features</Link>
            </li>
            <li className="hover:text-green-600 transition-colors">
              <Link to="/">Pricing</Link>
            </li>
            <li className="hover:text-green-600 transition-colors">
              <Link to="/">About</Link>
            </li>

            {user ? (
              <div className="ml-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Avatar className="cursor-pointer w-10 h-10 border-2 border-green-200 hover:border-green-400 transition-colors">
                      <AvatarImage
                        src={user.avatar || "https://github.com/shadcn.png"}
                      />
                      <AvatarFallback className="bg-green-100 text-green-700">
                        {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                      </AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-white w-56" align="end">
                    <DropdownMenuLabel className="text-green-700 font-semibold">
                      {user.name || "My Account"}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer hover:bg-green-50">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer hover:bg-green-50">
                      <BookA className="mr-2 h-4 w-4" />
                      <span>Notes</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={logoutHandler}
                      className="cursor-pointer text-red-600 hover:bg-red-50 focus:text-red-600"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Logout</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <Link
                to="/signin"
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors font-medium"
              >
                Login
              </Link>
            )}
          </ul>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer w-9 h-9 mr-3 border-2 border-green-200">
                  <AvatarImage
                    src={user.avatar || "https://github.com/shadcn.png"}
                  />
                  <AvatarFallback className="bg-green-100 text-green-700">
                    {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white w-48" align="end">
                <DropdownMenuLabel className="text-green-700">
                  {user.name || "My Account"}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer hover:bg-green-50">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer hover:bg-green-50">
                  <BookA className="mr-2 h-4 w-4" />
                  <span>Notes</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={logoutHandler}
                  className="cursor-pointer text-red-600 hover:bg-red-50"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link
              to="/signin"
              className="bg-green-600 text-white px-3 py-1.5 rounded-md text-sm mr-3"
            >
              Login
            </Link>
          )}

          <button
            onClick={toggleMobileMenu}
            className="p-2 rounded-md text-gray-700 hover:text-green-600 hover:bg-green-50 transition-colors"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 py-4 px-4 shadow-lg">
          <ul className="flex flex-col space-y-3">
            <li>
              <Link
                to="/"
                className="block py-2 px-4 rounded-md hover:bg-green-50 hover:text-green-700 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="block py-2 px-4 rounded-md hover:bg-green-50 hover:text-green-700 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Pricing
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="block py-2 px-4 rounded-md hover:bg-green-50 hover:text-green-700 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
            </li>

            {!user && (
              <li className="pt-3 border-t border-gray-100">
                <Link
                  to="/signup"
                  className="block bg-green-600 text-white text-center py-2 px-4 rounded-md hover:bg-green-700 transition-colors font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
