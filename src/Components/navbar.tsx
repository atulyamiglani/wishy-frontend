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
      <SearchBar />

      <div className="flex space-x-4">
        {user == null && (
          <>
            <Link
              to="/sign-up"
              className="text-lg text-purple-600 hover:text-blue-600"
            >
              Sign Up
            </Link>
            <Link
              to="/login"
              className="text-lg text-purple-600 hover:text-blue-600"
            >
              Login
            </Link>
          </>
        )}
        <Link
          to="/search"
          className="text-lg text-purple-600 hover:text-blue-600"
        >
          Search
        </Link>

        {user && (
          <>
            <Link
              to="/profile"
              className="text-lg text-purple-600 hover:text-blue-600"
            >
              Profile
            </Link>
            <button
              className="text-lg text-purple-600 hover:text-blue-600"
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
