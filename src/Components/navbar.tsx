import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../App";
import SearchBar from "./Search/SearchBar";

const Navbar: React.FC = () => {
  const { user, setUser } = useContext(CurrentUserContext);

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <nav className="bg-white fixed top-0 w-full shadow-md p-4 flex items-center justify-between">
      <Link
        to="/"
        className="text-3xl font-bold text-purple-600 hover:text-blue-600"
      >
        Wishy
      </Link>
      <SearchBar goToPageLink="search" placeHolder="Search for a product..." />

      <div className="flex space-x-5">
        {user == null && (
          <>
            <Link
              to="/sign-up"
              className="text-lg font-bold text-purple-600 hover:text-blue-600"
            >
              Sign Up
            </Link>
            <Link
              to="/login"
              className="text-lg font-bold text-purple-600 hover:text-blue-600"
            >
              Login
            </Link>
          </>
        )}

        {user && (
          <>
            {user.role === "WISHER" && (
              <Link
                to="my-wishlists"
                className="text-lg font-bold text-purple-600 hover:text-blue-600"
              >
                My Wishlists
              </Link>
            )}
            {user.role === "GIFTER" && (
              <Link
                to="/saved-wishlists"
                className="text-lg font-bold text-purple-600 hover:text-blue-600"
              >
                Saved Wishlists
              </Link>
            )}
            <Link
              to="/profile"
              className="text-lg font-bold text-purple-600 hover:text-blue-600"
            >
              Profile
            </Link>
            <button
              className="text-lg font-bold font-bold text-purple-600 hover:text-blue-600"
              onClick={handleLogout}
            >
              Log Out
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
