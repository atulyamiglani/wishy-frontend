import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Profile from "./Components/Profile";
import Navbar from "./Components/navbar";
import Search from "./Components/Search";

function App() {
  return (
    <BrowserRouter>
      {/* Main Navigation */}
      <Navbar />

      {/* This is to make sure the navbar doesn't overlap the content */}
      <div className="h-16"></div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
