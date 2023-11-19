import React, { useContext, useEffect, useState } from "react";
import ProductCard from "../ProductCard";
import { CurrentUserContext, ProductInfo, Wishlist } from "../../App";

const mockProducts: ProductInfo[] = [
  {
    title: "Toaster",
    link: "https://www.target.com/p/cuisinart-2-slice-toaster-white-cpt-122/-/A-18817395#lnk=sametab",
    tcin: "1",
    featureBullets: ["sturdy", "toasts bread"],
    rating: 4.9,
    ratingsTotal: 245,
    mainImage: "https://m.media-amazon.com/images/I/71n-oeNV6BL.jpg",
    price: 124.99,
  },
  {
    title: "A very long title for no apparent reason and it's kind of annoying but it trails off into nothingness",
    link: "https://www.target.com/p/caf-233-express-finish-2-slice-metal-toaster-matte-black/-/A-89121423#lnk=sametab",
    tcin: "2",
    featureBullets: ["reliable", "again, toasts bread"],
    rating: 4.2,
    ratingsTotal: 12,
    mainImage: "https://target.scene7.com/is/image/Target/GUEST_f6330ecc-fd9f-4f6a-8448-691f0bf6c9e5?wid=1200&hei=1200&qlt=80&fmt=webp",
    price: 59.99,
  },
  {
    title: "Hamilton Beach 2 Slice Toaster",
    link: "https://www.target.com/p/hamilton-beach-2-slice-toaster-stainless-steel/-/A-52062134#lnk=sametab",
    tcin: "3",
    featureBullets: ["sturdy", "toasts bread"],
    rating: 4.2,
    ratingsTotal: 245,
    mainImage: "https://target.scene7.com/is/image/Target/GUEST_0d2c844e-437f-4aa8-b326-6820a0bae3b6?qlt=65&fmt=webp&hei=350&wid=350",
    price: 12.00,
  },
  {
    title: "KitchenSmith by Bella 2 slice Toaster",
    link: "https://www.target.com/p/kitchensmith-by-bella-2-slice-toaster/-/A-48635475#lnk=sametab",
    tcin: "4",
    featureBullets: ["sturdy", "toasts bread"],
    rating: 4.0,
    ratingsTotal: 245,
    mainImage: "https://target.scene7.com/is/image/Target/GUEST_c68a613f-30f4-4e8b-88ca-2e546cd104cd?wid=1200&hei=1200&qlt=80&fmt=webp",
    price: 12.99,
  },
  {
    title: "Hamilton Beach 4 Slice Toaster Brushed Stainless Steel - 24714",
    link: "https://www.target.com/p/hamilton-beach-4-slice-toaster-brushed-stainless-steel-24714/-/A-86409137#lnk=sametab",
    tcin: "5",
    featureBullets: ["sturdy", "toasts bread"],
    rating: 4.2,
    ratingsTotal: 12,
    mainImage: "https://target.scene7.com/is/image/Target/GUEST_e2342a55-004c-474d-bfe7-09a234e71bd0?wid=1200&hei=1200&qlt=80&fmt=webp",
    price: 159.99,
  },
  {
    title: "Toaster",
    link: "https://www.target.com/p/cuisinart-2-slice-toaster-white-cpt-122/-/A-18817395#lnk=sametab",
    tcin: "6",
    featureBullets: ["sturdy", "toasts bread"],
    rating: 4.9,
    ratingsTotal: 245,
    mainImage: "https://m.media-amazon.com/images/I/71n-oeNV6BL.jpg",
    price: 124.99,
  }
];

const Home: React.FC = () => {
  const [wishlists, setWishlists] = useState<Wishlist[]>([]);
  const { user, setUser } = useContext(CurrentUserContext);

  //fetches wishlists for the current user
  const fetchWishlistsForUser = async () => {
    const mockReturnValue = new Promise((resolve, reject) => {
      resolve(
        [{
          wid: "1",
          title: "My Wishlist",
          owner: user,
          productInfos: [{productId: "1", buyerId: null}]
        },
        {
          wid: "2",
          title: "My Christmas Wishlist",
          owner: user,
          productInfos: [{productId: "2", buyerId: null}, {productId: "3", buyerId: null}, {productId: "4", buyerId: null}]
        },
        {
          wid: "3",
          title: "My Birthday Wishlist",
          owner: user,
          productInfos: [{productId: "5", buyerId: null}, {productId: "1", buyerId: null}]
        },
        {
          wid: "4",
          title: "My Last Wishlist",
          owner: user,
          productInfos: [{productId: "3", buyerId: null}]
        }]
      );
    });
    mockReturnValue.then((response) => {
      setWishlists(response as Wishlist[]);
    });
  };

  useEffect(() => {
    fetchWishlistsForUser();
  }, []);

  return (
    <div className="container m-auto">
      <h1>Home</h1>
      <div className="flex flex-wrap gap-3 m-auto">
        {mockProducts.map((product) => (
          <ProductCard key={product.tcin} product={product} wishlists={wishlists} setWishlists={setWishlists} />
        ))}
      </div>
    </div>
  );
};

export default Home;
