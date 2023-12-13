import React, { FC, useContext, useEffect, useState } from "react";
import ProfileWishlists from "../Profile/profilewishlists";
import { CurrentUserContext, Wishlist } from "../../App";
import { getWishlistsFollowedByUser } from "../../client";

const SavedWishlists: FC = () => {
  const { user, setUser } = useContext(CurrentUserContext);

  //get wishlists
  const emptyWishlists: Wishlist[] = [];
  const [wishlists, setWishlists] = useState(emptyWishlists);
  useEffect(() => {
    getWishlistsFollowedByUser(user!.username)
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
        <h1 className="text-4xl">My Saved Wishlists</h1>
      </div>
      {wishlists.length === 0 && (
        <p className="text-xl">
          You haven't saved any wishlists yet. Follow some people or go home to
          find some!
        </p>
      )}
      {wishlists.length > 0 && <ProfileWishlists wishlists={wishlists} />}
    </div>
  );
};

export default SavedWishlists;
