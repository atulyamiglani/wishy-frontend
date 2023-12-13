import { useNavigate, useParams } from "react-router-dom";
import { CurrentUserContext, ProductInfo, Wishlist } from "../../App";
import mockWishlists from "../../MockDB/wishlists.json";
import mockProducts from "../../MockDB/products.json";
import AddToWishlistButton from "../AddToWishlistButton";
import { useContext, useEffect, useState } from "react";
import * as targetClient from "../../targetClient";
import { getWishlistsForUser, updateWishlist } from "../../client";

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
      <p className="ms-2 text-sm font-bold text-gray-900">{productRating}</p>
      <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full"></span>
      <a
        href="#"
        className="text-sm font-medium text-gray-900 underline hover:no-underline"
      >
        {ratingsTotal} reviews
      </a>
    </div>
  </>
);

const ProductsDetails: React.FC = () => {
  const { user, setUser } = useContext(CurrentUserContext);
  const { productId } = useParams();
  const [product, setProduct] = useState<ProductInfo | undefined>(undefined);

  const fetchProduct = async (id: string): Promise<ProductInfo> => {
    return targetClient.product(id);
  };

  useEffect(() => {
    console.log("Fetching Product...");

    //first, check for product in database
    //todo: replace this with api call to node server
    const product = mockProducts.find((p) => p.tcin === productId);
    if (product) {
      console.log("Found product in database: ", product);
      setProduct(product);

      //if not found in database, fetch from target api
    } else if (productId != null) {
      console.log("Product not found in database. Fetching from Target API.");
      fetchProduct(productId).then((res) => {
        setProduct(res);
      });
    }
  }, [productId]);

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

  const navigate = useNavigate();

  if (product === undefined) {
    // TODO: maybe make a fancy 404 page.
    return (
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
    );
  } else if (product.title === undefined || product.title === "") {
    return <>Sorry, we couldn't find your product. Please try again!</>;
  } else {
    return (
      <div className="grid grid-cols-2 py-5">
        <div className="col-span-1 content-center justify-self-center">
          <img
            className="object-contain hover:object-scale-down h-96 w-50"
            src={product.mainImage}
            alt={product.title}
          />
          <a
            href={product.link}
            target="_blank"
            rel="noreferrer"
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
          >
            View in Target
          </a>
        </div>
        <div className="col-span-1">
          <h1 className="flex items-center text-5xl font-extrabold">
            {product.title}
          </h1>

          <h2 className="pt-4">${product.price}</h2>
          {ratingView(product.rating, product.ratingsTotal)}

          <ul className="space-y-4 text-left text-gray-500 dark:text-gray-400 pt-4">
            {product.featureBullets &&
              product.featureBullets.map((feature: any) => (
                <div key={feature.slice(0, 15)}>
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
                </div>
              ))}
          </ul>

          <div className="py-5">
            <AddToWishlistButton
              product={product}
              wishlists={wishlists}
              updateWishlists={updateWishlists}
            />
          </div>
        </div>
      </div>
    );
  }
};

export default ProductsDetails;
