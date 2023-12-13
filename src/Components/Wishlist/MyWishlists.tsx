import React, { FC, useContext, useEffect, useState } from "react";
import ProfileWishlists from "../Profile/profilewishlists";
import { CurrentUserContext, Wishlist } from "../../App";
import { getWishlistsForUser } from "../../client";
import { Link } from "react-router-dom";

const MyWishlists: FC = () => {
  const { user, setUser } = useContext(CurrentUserContext);

  //get wishlists
  const emptyWishlists: Wishlist[] = [];
  const [wishlists, setWishlists] = useState(emptyWishlists);
  useEffect(() => {
    getWishlistsForUser(user!.username)
      .then((wishlists) => {
        if (wishlists) {
          setWishlists(wishlists);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user]);

  return (
    <div className="container m-auto ps-8 pe-8 pt-8 mb-8 max-w-4xl">
      <div className="flex items-end justify-between mb-5">
        <h1 className="text-4xl">My Wishlists</h1>
        <Link
          to="/new-wishlist"
          className="inline-flex justify-center rounded-md shadow-sm px-3 py-2 bg-teal-600 text-sm font-medium text-white hover:bg-teal-500"
        >
          + Create Wishlist
        </Link>
      </div>
      {wishlists.length === 0 && (
        <p className="text-xl">
          You don't have any wishlists yet. Click the button above to create
          one!
        </p>
      )}
      {wishlists.length > 0 && <ProfileWishlists wishlists={wishlists} />}
    </div>
  );
};

export default MyWishlists;
