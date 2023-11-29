import React from "react";
import { CurrentUserContext, ProductInfo, Wishlist } from "../../App";
import ProductCard from "../ProductCard";
import { useParams } from "react-router-dom";
import ProductRemoveButton from "./ProductRemoveButton";
import { useState, useEffect } from "react";
import mockWishlists from "../../MockDB/wishlists.json";
import mockProducts from "../../MockDB/products.json";

const WishlistView: React.FC = () => {
  //get wishlist
  const { wishlistId } = useParams();
  const [wishlist, setWishlist] = useState(
    mockWishlists.find((w) => w.wid === wishlistId) as Wishlist
  );

  //get products
  const [products, setProducts] = useState<ProductInfo[]>([]);
  const fetchProducts = () => {
    const productList: ProductInfo[] = [];
    wishlist.productInfos.forEach((productInfo) => {
      const product = mockProducts.find(
        (p) => p.tcin === productInfo.productId
      );
      if (product) {
        productList.push(product);
      }
    });
    setProducts(productList);
  };
  useEffect(fetchProducts, [wishlist]);

  //get viewing state
  const { user } = React.useContext(CurrentUserContext);
  let showRemoveButton = user && wishlist.owner === user.username; //requires a logged in user
  let showBuyButton = user && !showRemoveButton && !user.isWishing; //requires a logged in user in gifting mode who is not the owner of the list

  return (
    <div className="container m-auto">
      {/*Intro*/}
      <h1 className="text-5xl font-bold mb-2">{wishlist.title}</h1>
      <div className="flex justify-between items-center mb-4">
        <p className="text-2xl font-semibold">by {wishlist.owner}</p>
        <div className="flex items-center">
          <p className="text-xl font-semibold me-4">12 followers</p>
          <button className="inline-flex justify-center rounded-md shadow-sm px-3 py-2 bg-amber-600 text-sm font-medium text-white hover:bg-amber-500">
            Follow this list
          </button>
        </div>
      </div>
      <hr />
      <p className="text-lg italic mt-4 mb-4">Last Updated 11/19/23</p>
      <p className="text-lg mb-4">
        {wishlist.description}
      </p>

      {/*Products*/}
      <div className="container m-auto">
        <div className="flex flex-wrap gap-3 m-auto">
          {products.map((product) => (
            <ProductCard
              key={product.tcin}
              product={product}
              bottomContent={
                showRemoveButton && (
                  <ProductRemoveButton
                    productId={product.tcin}
                    onRemove={() => {}}
                  />
                )
              }
            />
          ))}
        </div>
      </div>
      <div className="flex flex-wrap gap-3 m-auto"></div>
    </div>
  );
};

export default WishlistView;
