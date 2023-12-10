import { Link, useNavigate, useParams } from "react-router-dom";
import { ProductInfo, Wishlist } from "../../App";
import { mockedProducts } from "../Search";
import WishlistModal from "../AddToWishlistModal";
import mockWishlists from "../../MockDB/wishlists.json";
import AddToWishlistButton from "../AddToWishlistButton";
import { useState } from "react";

const ratingView = (productRating: number, ratingsTotal: number) => (
  <>
    <div className="flex items-center">
      <svg
        className="w-4 h-4 text-yellow-300 me-1"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 22 20"
      >
        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
      </svg>
      <p className="ms-2 text-sm font-bold text-gray-900 dark:text-white">
        {productRating}
      </p>
      <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"></span>
      <a
        href="#"
        className="text-sm font-medium text-gray-900 underline hover:no-underline dark:text-white"
      >
        {ratingsTotal} reviews
      </a>
    </div>
  </>
);

const ProductsDetails: React.FC = () => {
  const { productId } = useParams();

  const fetchProduct = async (id: string): Promise<ProductInfo> => {
    console.log(
      "product",
      mockedProducts.find((product) => product.tcin === id)
    );
    return mockedProducts.find((product) => product.tcin === id);
  };

  // TODO: api call
  const fetchWishlists = () => {
    return mockWishlists as Wishlist[];
  };

  const [wishlists, setWishlists] = useState(fetchWishlists());

  const navigate = useNavigate();

  const product = productId ? fetchProduct(productId) : undefined;
  if (product === undefined) {
    // TODO: maybe make a fancy 404 page.
    return <>This product no longer exists.</>;
  } else {
    return (
      <div className="grid grid-cols-2 py-5">
        <div className="col-span-1 content-center justify-self-center">
          <img
            className="object-contain hover:object-scale-down h-96 w-50"
            src={product.mainImage}
          />
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full">
            <a href={product.link} target="_blank">
              View on target
            </a>
          </button>
        </div>
        <div className="col-span-1">
          <h1 className="flex items-center text-5xl font-extrabold">
            {product.title}
          </h1>

          <h2 className="pt-4">${product.price}</h2>
          {ratingView(product.rating, product.ratingsTotal)}

          <ul className="space-y-4 text-left text-gray-500 dark:text-gray-400 pt-4">
            {product.featureBullets.map((feature: any) => (
              <>
                <li className="flex items-center space-x-3 rtl:space-x-reverse">
                  <svg
                    className="flex-shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 16 12"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M1 5.917 5.724 10.5 15 1.5"
                    />
                  </svg>
                  <span>{feature}</span>
                </li>
              </>
            ))}
          </ul>

          <div className="py-5">
            <AddToWishlistButton
              product={product}
              wishlists={wishlists}
              setWishlists={setWishlists}
            />
          </div>
        </div>
      </div>
    );
  }
};

export default ProductsDetails;
