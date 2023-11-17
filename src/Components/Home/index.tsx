import React, { useContext, useEffect, useState } from "react";
import ProductCard from "../productcard";
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
    featureBullets: ["sturdy", "toasts bread"],
    rating: 4.2,
    ratingsTotal: 12,
    mainImage: "https://target.scene7.com/is/image/Target/GUEST_f6330ecc-fd9f-4f6a-8448-691f0bf6c9e5?wid=1200&hei=1200&qlt=80&fmt=webp",
    price: 59.99,
  },
  {
    title: "Toaster",
    link: "https://www.target.com/p/cuisinart-2-slice-toaster-white-cpt-122/-/A-18817395#lnk=sametab",
    tcin: "3",
    featureBullets: ["sturdy", "toasts bread"],
    rating: 4.9,
    ratingsTotal: 245,
    mainImage: "https://m.media-amazon.com/images/I/71n-oeNV6BL.jpg",
    price: 124.99,
  },
  {
    title: "A very long title for no apparent reason and it's kind of annoying but it trails off into nothingness",
    link: "https://www.target.com/p/caf-233-express-finish-2-slice-metal-toaster-matte-black/-/A-89121423#lnk=sametab",
    tcin: "4",
    featureBullets: ["sturdy", "toasts bread"],
    rating: 4.2,
    ratingsTotal: 12,
    mainImage: "https://target.scene7.com/is/image/Target/GUEST_f6330ecc-fd9f-4f6a-8448-691f0bf6c9e5?wid=1200&hei=1200&qlt=80&fmt=webp",
    price: 59.99,
  },
  {
    title: "Toaster",
    link: "https://www.target.com/p/cuisinart-2-slice-toaster-white-cpt-122/-/A-18817395#lnk=sametab",
    tcin: "5",
    featureBullets: ["sturdy", "toasts bread"],
    rating: 4.9,
    ratingsTotal: 245,
    mainImage: "https://m.media-amazon.com/images/I/71n-oeNV6BL.jpg",
    price: 124.99,
  },
  {
    title: "A very long title for no apparent reason and it's kind of annoying but it trails off into nothingness",
    link: "https://www.target.com/p/caf-233-express-finish-2-slice-metal-toaster-matte-black/-/A-89121423#lnk=sametab",
    tcin: "6",
    featureBullets: ["sturdy", "toasts bread"],
    rating: 4.2,
    ratingsTotal: 12,
    mainImage: "https://target.scene7.com/is/image/Target/GUEST_f6330ecc-fd9f-4f6a-8448-691f0bf6c9e5?wid=1200&hei=1200&qlt=80&fmt=webp",
    price: 59.99,
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
          productIds: ["1"]
        },
        {
          wid: "2",
          title: "My Christmas Wishlist",
          owner: user,
          productIds: ["2", "3", "4", "6"]
        },
        {
          wid: "3",
          title: "My Birthday Wishlist",
          owner: user,
          productIds: ["5", "6"]
        },
        {
          wid: "4",
          title: "My Last Wishlist",
          owner: user,
          productIds: ["1", "4", "6"]
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
          <ProductCard key={product.tcin} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Home;
