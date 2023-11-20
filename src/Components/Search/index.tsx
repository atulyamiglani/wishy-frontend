import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { ProductInfo } from "../../App";
import ProductCard from "../ProductCard";

// todo: remove this
export const mockedProducts: ProductInfo[] = [
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
    title:
      "A very long title for no apparent reason and it's kind of annoying but it trails off into nothingness",
    link: "https://www.target.com/p/caf-233-express-finish-2-slice-metal-toaster-matte-black/-/A-89121423#lnk=sametab",
    tcin: "2",
    featureBullets: ["reliable", "again, toasts bread"],
    rating: 4.2,
    ratingsTotal: 12,
    mainImage:
      "https://target.scene7.com/is/image/Target/GUEST_f6330ecc-fd9f-4f6a-8448-691f0bf6c9e5?wid=1200&hei=1200&qlt=80&fmt=webp",
    price: 59.99,
  },
  {
    title: "Hamilton Beach 2 Slice Toaster",
    link: "https://www.target.com/p/hamilton-beach-2-slice-toaster-stainless-steel/-/A-52062134#lnk=sametab",
    tcin: "3",
    featureBullets: ["sturdy", "toasts bread"],
    rating: 4.2,
    ratingsTotal: 245,
    mainImage:
      "https://target.scene7.com/is/image/Target/GUEST_0d2c844e-437f-4aa8-b326-6820a0bae3b6?qlt=65&fmt=webp&hei=350&wid=350",
    price: 12.0,
  },
  {
    title: "KitchenSmith by Bella 2 slice Toaster",
    link: "https://www.target.com/p/kitchensmith-by-bella-2-slice-toaster/-/A-48635475#lnk=sametab",
    tcin: "4",
    featureBullets: ["sturdy", "toasts bread"],
    rating: 4.0,
    ratingsTotal: 245,
    mainImage:
      "https://target.scene7.com/is/image/Target/GUEST_c68a613f-30f4-4e8b-88ca-2e546cd104cd?wid=1200&hei=1200&qlt=80&fmt=webp",
    price: 12.99,
  },
  {
    title: "Hamilton Beach 4 Slice Toaster Brushed Stainless Steel - 24714",
    link: "https://www.target.com/p/hamilton-beach-4-slice-toaster-brushed-stainless-steel-24714/-/A-86409137#lnk=sametab",
    tcin: "5",
    featureBullets: ["sturdy", "toasts bread"],
    rating: 4.2,
    ratingsTotal: 12,
    mainImage:
      "https://target.scene7.com/is/image/Target/GUEST_e2342a55-004c-474d-bfe7-09a234e71bd0?wid=1200&hei=1200&qlt=80&fmt=webp",
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
  },
];

const Search: React.FC = () => {
  const [searchParams, _] = useSearchParams();
  const searchTerm = searchParams.get("q");
  const [products, setProducts] = useState<ProductInfo[]>([]);

  const fetchProducts = async (searchTerm: string): Promise<ProductInfo[]> => {
    return new Promise((resolve, reject) => {
      resolve(mockedProducts);
    });
  };

  useEffect(() => {
    if (searchTerm != null) {
      fetchProducts(searchTerm).then((res) => {
        setProducts(res);
      });
    }
  }, []);
  return (
    <div>
      <h3>Results for {searchTerm}...</h3>
      {products.length === 0 && (
        <div role="status">
          <svg
            aria-hidden="true"
            className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      )}
      {(products as ProductInfo[]) && (
        <div className="flex flex-wrap gap-3 m-auto">
          {mockedProducts.map((product) => (
            <ProductCard key={product.tcin} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
