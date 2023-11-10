import React, { createContext, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Profile from "./Components/Profile";
import Navbar from "./Components/navbar";
import Search from "./Components/Search";
import SignUp from "./Components/SignUp";
import Login from "./Components/Login";
import Editor from "./Components/Profile/editor";

export interface User {
  name: string;
  email: string;
}

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
          <Route path="/profile" element={user ? <Profile forCurrentUser={true}/> : <Navigate to="/login"/>}/>
          <Route path="/profile/:id" element={<Profile forCurrentUser={false}/>}/>
          <Route path="/search" element={<Search />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </CurrentUserContext.Provider>
  );
}

export default App;
