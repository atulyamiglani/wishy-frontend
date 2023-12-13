import React, { useState } from "react";
import { ProductInfo, Wishlist } from "../App";
import WishlistModal from "./AddToWishlistModal";

interface AddToWishlistButtonProps {
  product: ProductInfo;
  wishlists: Wishlist[];
  updateWishlists: (newWishlists: Wishlist[]) => void;
}

/*
 * A button that opens a modal to add a product to a wishlist.
 * Should be presented on a product card or product details page.
 */
const AddToWishlistButton: React.FC<AddToWishlistButtonProps> = ({
  product,
  wishlists,
  updateWishlists,
}) => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleCancel = () => {
    setModalOpen(false);
  };

  const handleSubmit = (wishlists: Wishlist[]) => {
    updateWishlists(wishlists);
    setModalOpen(false);
  };

  const countWishlistsIncludingProduct = (productId: string) => {
    let count = 0;
    wishlists.forEach((w) => {
      if (w.productInfos.some((p) => p.productId === productId)) count++;
    });
    return count;
  };

  return (
    <>
      <button
        className="inline-flex justify-center mb-1 rounded-md shadow-sm px-3 py-2 bg-teal-600 text-sm font-medium text-white hover:bg-teal-500"
        onClick={() => setModalOpen(true)}
      >
        Add to Wishlist
      </button>
      <p className="text-gray-500 text-sm">
        Included in {countWishlistsIncludingProduct(product.tcin)} wishlists.
      </p>
      {modalOpen && (
        <WishlistModal
          product={product}
          wishlists={wishlists!}
          handleCancel={handleCancel}
          handleSubmit={handleSubmit}
        />
      )}
    </>
  );
};

export default AddToWishlistButton;
