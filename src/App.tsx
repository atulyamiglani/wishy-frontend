import React, { createContext, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Profile from "./Components/Profile";
import Navbar from "./Components/navbar";
import Search from "./Components/Search";
import SignUp from "./Components/SignUp";
import Login from "./Components/Login";
import WishlistView from "./Components/Wishlist";
import ProductsDetails from "./Components/ProductDetails";
import CreateWishlist from "./Components/Wishlist/CreateWishlist";
import MyWishlists from "./Components/Wishlist/MyWishlists";
import SavedWishlists from "./Components/Wishlist/SavedWishlists";
import PeopleList from "./Components/People";

export interface User {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone: string;
  role: "WISHER" | "GIFTER";
}

export interface ProductInfo {
  title: string;
  link: string;
  tcin: string;
  featureBullets: string[];
  rating: number;
  ratingsTotal: number;
  mainImage: string;
  price: number;
}

export interface WishlistProductInfo {
  productId: string;
  buyerId: string | null;
}

export interface Wishlist {
  wid: string; //unique id
  title: string;
  description: string;
  productInfos: WishlistProductInfo[]; //product tcins and buyer ids
  owner: string; //owner id
  created: string;
  lastUpdated: string;
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
        <div className="h-24"></div>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/profile"
            element={
              user ? (
                <Profile forCurrentUser={true} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/profile/:username"
            element={<Profile forCurrentUser={false} />}
          />
          <Route path="/search" element={<Search />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/wishlist/:wishlistId" element={<WishlistView />} />
          <Route path="/details/:productId" element={<ProductsDetails />} />
          {/*could update to redirect to a "switch to wishing" page if user is in gifting mode*/}
          <Route
            path="/new-wishlist"
            element={user ? <CreateWishlist /> : <Navigate to="/login" />}
          />
          <Route
            path="/my-wishlists"
            element={user ? <MyWishlists /> : <Navigate to="/login" />}
          />
          <Route
            path="/saved-wishlists"
            element={user ? <SavedWishlists /> : <Navigate to="/login" />}
          />
          <Route
            path="/people"
            element={user ? <PeopleList /> : <Navigate to="/login" />}
          />
        </Routes>
      </BrowserRouter>
    </CurrentUserContext.Provider>
  );
}

export default App;
