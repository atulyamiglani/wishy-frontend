import React, { useContext, useState } from "react";
import { createWishlist } from "../../client";
import { CurrentUserContext } from "../../App";
import { useNavigate } from "react-router-dom";

interface CreateWishlistProps {}

const CreateWishlist: React.FC<CreateWishlistProps> = () => {
  const { user, setUser } = useContext(CurrentUserContext);
  const [wishlistName, setWishlistName] = useState<string>("");
  const [wishlistDescription, setWishlistDescription] = useState<string>("");
  const navigate = useNavigate();

  const newWishlist = async () => {
    const wishlist = createWishlist(
      wishlistName,
      wishlistDescription,
      user!.username
    );
    wishlist.then((res) => {
      console.log(res);
      if (res._id) {
        navigate(`/wishlist/${res._id}`);
      } else {
        navigate("/my-wishlists");
      }
    });
  };

  return (
    <div className="container m-auto ps-8 pe-8 pt-8 mb-8 max-w-4xl">
      <h1 className="mb-5">Create Wishlist</h1>
      <label htmlFor="wishlistName" className="text-xl">
        Wishlist Name
      </label>
      <input
        onChange={(e) => setWishlistName(e.target.value)}
        type="text"
        value={wishlistName}
        id="wishlistName"
        className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mb-5"
      />
      <label htmlFor="wishlistDescription" className="text-xl">
        Wishlist Description
      </label>
      <textarea
        onChange={(e) => setWishlistDescription(e.target.value)}
        id="wishlistDescription"
        value={wishlistDescription}
        name="wishlistDescription"
        className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mb-5"
      />
      <button
        onClick={newWishlist}
        className="flex justify-center rounded-md bg-teal-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Create Wishlist
      </button>
    </div>
  );
};

export default CreateWishlist;
