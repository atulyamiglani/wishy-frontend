import React, { useContext, useEffect, useState } from "react";
import ProductCard from "../ProductCard";
import { CurrentUserContext, ProductInfo, Wishlist } from "../../App";
import mockProducts from "../../MockDB/products.json";
import AddToWishlistButton from "../AddToWishlistButton";

const Home: React.FC = () => {
  const [wishlists, setWishlists] = useState<Wishlist[]>([]);
  const { user, setUser } = useContext(CurrentUserContext);

  //fetches wishlists for the current user
  const fetchWishlistsForUser = async () => {
    const mockReturnValue = new Promise((resolve, reject) => {
      resolve([
        {
          wid: "1",
          title: "My Wishlist",
          owner: user,
          productInfos: [{ productId: "1", buyerId: null }],
        },
        {
          wid: "2",
          title: "My Christmas Wishlist",
          owner: user,
          productInfos: [
            { productId: "2", buyerId: null },
            { productId: "3", buyerId: null },
            { productId: "4", buyerId: null },
          ],
        },
        {
          wid: "3",
          title: "My Birthday Wishlist",
          owner: user,
          productInfos: [
            { productId: "5", buyerId: null },
            { productId: "1", buyerId: null },
          ],
        },
        {
          wid: "4",
          title: "My Last Wishlist",
          owner: user,
          productInfos: [{ productId: "3", buyerId: null }],
        },
      ]);
    });
    mockReturnValue.then((response) => {
      setWishlists(response as Wishlist[]);
    });
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

  useEffect(() => {
    fetchWishlistsForUser();
  }, []);

  return (
    <div className="container m-auto">
      <h1>Home</h1>
      <div className="flex flex-wrap gap-3 m-auto">
        {products.map((product) => (
          <ProductCard
            key={product.tcin}
            product={product}
            bottomContent={
              <AddToWishlistButton
                product={product}
                wishlists={wishlists}
                setWishlists={setWishlists}
              />
            }
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
