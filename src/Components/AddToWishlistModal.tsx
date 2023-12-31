import { FaCheck } from "react-icons/fa";
import { ProductInfo, Wishlist } from "../App";
import React, { useEffect, useState } from "react";
import { getProduct, addProduct } from "../client";

interface WishlistModalProps {
  product: ProductInfo;
  wishlists: Wishlist[];
  handleCancel: () => void;
  handleSubmit: (wishlists: Wishlist[]) => void;
}

/*
 * A modal to add a product to a wishlist.
 * Should be presented on a product card or product details page.
 */
const WishlistModal: React.FC<WishlistModalProps> = ({
  product,
  wishlists,
  handleCancel,
  handleSubmit,
}) => {
  const [updatedWishlists, setUpdatedWishlists] = useState<Wishlist[]>([
    ...wishlists,
  ]);

  //adds the product to the database if it does not already exist there.
  const addProductToDB = async () => {
    console.log("Getting product from DB: ", product);
    const res = await getProduct(product.tcin).then((res) => {
      if (res) {
        console.log("Product found in DB: ", res);
        return res;
      } else {
        console.log("Product not found in DB. Adding...");
        return addProduct(product).then((res) => {
          console.log("Product added to DB: ", res);
          return res;
        });
      }
    });
  };

  useEffect(() => {
    console.log("Add product to database...");
    addProductToDB();
  }, []);

  const toggleProductInWishlist = (wishlist: Wishlist, productId: string) => {
    const newWishlist = { ...wishlist };

    if (newWishlist.productInfos.some((w) => w.productId === productId)) {
      newWishlist.productInfos = newWishlist.productInfos.filter(
        (w) => w.productId !== productId
      );
    } else {
      newWishlist.productInfos = [
        ...newWishlist.productInfos,
        { productId, buyerId: null },
      ];
    }

    const newWishlists = [
      ...updatedWishlists.map((w) =>
        w._id === newWishlist._id ? newWishlist : w
      ),
    ];
    setUpdatedWishlists(newWishlists);
  };

  const cancel = () => {
    setUpdatedWishlists([...wishlists]);
    handleCancel();
  };

  const submit = () => {
    handleSubmit(updatedWishlists);
  };

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start w-full">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                <div className="flex items-start mb-2">
                  <img
                    className="mb-2 me-3 w-40 rounded-t-lg"
                    src={product.mainImage}
                    alt={product.title}
                  />
                  <div>
                    <h2 className="tracking-tight text-gray-900 line-clamp-3 mb-1">
                      {product.title.replace(/&#34;/g, '"')}
                    </h2>
                    <h2 className="font-normal">${product.price}</h2>
                  </div>
                </div>
                <hr />
                <h2 className="text-gray-900 mt-4">Add to Wishlists:</h2>
                <div
                  className="py-1 w-full"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="menu-button"
                >
                  {updatedWishlists.map((w) => (
                    <button
                      key={w._id}
                      className={`flex justify-between items-center w-full rounded-lg p-2 hover:bg-teal-200 ${
                        w.productInfos.some(
                          (w) => w.productId === product.tcin
                        ) && "bg-teal-100"
                      } `}
                      onClick={() => {
                        toggleProductInWishlist(w, product.tcin);
                      }}
                    >
                      {w.title}
                      {w.productInfos.some(
                        (w) => w.productId === product.tcin
                      ) && <FaCheck />}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              onClick={submit}
              type="button"
              className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-teal-600 text-base font-medium text-white sm:ml-3 sm:w-auto sm:text-sm`}
            >
              Save
            </button>
            <button
              onClick={() => cancel()}
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishlistModal;
