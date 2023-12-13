import React, { useContext, useEffect, useState } from "react";
import ProductCard from "../ProductCard";
import { CurrentUserContext, ProductInfo, Wishlist } from "../../App";
import mockProducts from "../../MockDB/products.json";
import AddToWishlistButton from "../AddToWishlistButton";
import { getWishlistsForUser, updateWishlist } from "../../client";

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
      updateWishlist(w).then((res) => {
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
  const fetchProducts = () => {
    const productList: ProductInfo[] = [];
    mockProducts.forEach((product) => {
      productList.push(product);
    });
    setProducts(productList);
  };
  useEffect(fetchProducts, []);

  return (
    <div className="container m-auto">
      <h1>Home</h1>
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
      </div>
    </div>
  );
};

export default Home;
