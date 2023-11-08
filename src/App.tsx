import React, { createContext, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Profile from "./Components/Profile";
import Navbar from "./Components/navbar";
import Search from "./Components/Search";
import SignUp from "./Components/SignUp";

type User = {
  name: string;
  email: string;
};

export const CurrentUserContext = createContext<{
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}>({ user: null, setUser: () => {} });

function App() {
  const [user, setUser] = useState<null | User>(null);

  return (
    <CurrentUserContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        {/* Main Navigation */}
        <Navbar />

        {/* This is to make sure the navbar doesn't overlap the content */}
        <div className="h-16"></div>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/search" element={<Search />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </CurrentUserContext.Provider>
  );
}

export default App;
