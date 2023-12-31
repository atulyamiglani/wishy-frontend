import React, { useContext, useEffect, useState } from "react";
import ProductCard from "../ProductCard";
import { CurrentUserContext, ProductInfo, Wishlist } from "../../App";
import mockProducts from "../../MockDB/products.json";
import AddToWishlistButton from "../AddToWishlistButton";
import {
  getFeed,
  getFeedNoUser,
  getWishlistsForUser,
  updateWishlist,
} from "../../client";
import ProfileWishlists from "../Profile/profilewishlists";
import SearchBar from "../Search/SearchBar";

const Home: React.FC = () => {
  const { user, setUser } = useContext(CurrentUserContext);

  //suggested wishlists
  //null user, gifting user following 0
  //get 10 most recently updated wishlists

  //wishlists you follow
  //gifting user following >0
  //any wishlists followed by current user

  //wishlists of people you follow
  //gifting user following >0
  //get wishlists of people you follow, sorted by date

  //suggested products
  //null user, wishing user following 0
  //get our pre-made list of suggested products

  //products in your network
  //wishing user following >0
  //get products from wishlists of people you follow

  //fetches wishlists for the current user
  const fetchWishlistsForUser = async () => {
    if (user) {
      const wishlists = getWishlistsForUser(user.username).then((wishlists) => {
        setWishlists(wishlists);
      });
    }
  };
  //get wishlists for user
  const [wishlists, setWishlists] = useState<Wishlist[]>([]);
  useEffect(() => {
    if (user) {
      getWishlistsForUser(user!.username).then((res) => {
        setWishlists(res);
      });
    }
  }, [user]);

  //update wishlists for user
  const updateWishlists = (newWishlists: Wishlist[]) => {
    const updatedWishlists: Wishlist[] = [];
    newWishlists.forEach((w) => {
      updateWishlist(w).then((res: Wishlist) => {
        if (res) {
          console.log("Updated wishlist: ", res);
          updatedWishlists.push(res);
        }
      });
    });
    console.log("Updated wishlists: ", updatedWishlists);
    setWishlists(newWishlists);
  };

  //fetches products
  const [products, setProducts] = useState<ProductInfo[]>([]);
  const [feedWishlists, setFeedWishlists] = useState<Wishlist[]>([]);
  const fetchFeed = () => {
    if (user === null) {
      getFeedNoUser().then((products: ProductInfo[]) => {
        setProducts(products);
      });
    } else if (user.role === "WISHER") {
      getFeed(user).then((products) => {
        setProducts(products as ProductInfo[]);
      });
    } else {
      getFeed(user).then((wishlists) => {
        setFeedWishlists(wishlists as Wishlist[]);
      });
    }
  };
  useEffect(fetchFeed, []);

  return (
    <div className="container px-4 m-auto pb-5">
      <h1>Home</h1>
      <p className="mt-2 mb-4 w-8/12">
        Fulfill wishes with Wishy! Wishers can view products and add them to
        wishlists. Gifters can view wishlists and sign up to buy gifts,
        anonymously to the wisher. Organize birthdays, holidays, weddings and
        more with Wishy!
      </p>
      <hr className="mb-4" />
      {!user && (
        <>
          <SearchBar goToPageLink="people" placeHolder="Find people..." />
          <hr className="mt-4" />
        </>
      )}
      {user && user.role === "WISHER" && (
        <h2 className="mb-4">Products your friends are looking for...</h2>
      )}
      {user && user.role === "GIFTER" && <h2>Wishlists you follow... </h2>}
      {!user && <h2 className="mb-4 pt-8">Popular Products...</h2>}
      <div className="flex flex-wrap gap-3 m-auto">
        {products.map((product) => (
          <ProductCard
            key={product.tcin}
            product={product}
            bottomContent={
              user && (
                <AddToWishlistButton
                  product={product}
                  wishlists={wishlists}
                  updateWishlists={updateWishlists}
                />
              )
            }
          />
        ))}
        {products.length === 0 && user?.role === "WISHER" && (
          <>
            <h2>Follow more friends to see what they are wishing for!</h2>
          </>
        )}
        {user?.role === "GIFTER" && (
          <>
            <div className="container m-auto ps-8 pe-8 pt-8 mb-8 max-w-4xl">
              {<ProfileWishlists wishlists={feedWishlists} />}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
