import React from "react";
import { CurrentUserContext, ProductInfo, Wishlist } from "../../App";
import ProductCard from "../ProductCard";

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

const WishlistView: React.FC = () => {
  return (
    <div className="container m-auto">
      {/*Intro*/}
      <h1 className="text-5xl font-bold mb-2">My Wishlist</h1>
      <div className="flex justify-between items-center mb-4">
        <p className="text-2xl font-semibold">by Hunter Groff</p>
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
        This is a list of things I want for Christmas! Thanks for buying things
        for me and making me a very happy boy! I am going to continue writing
        things that have no meaning because I want to test what this looks like
        with long enough text! Thanks homies and dudettes!
      </p>

      <div className="container m-auto">
        <div className="flex flex-wrap gap-3 m-auto">
          {mockProducts.map((product) => (
            <ProductCard
              key={product.tcin}
              product={product}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-wrap gap-3 m-auto"></div>
    </div>
  );
};

export default WishlistView;
