import React from "react";
import { Link } from "react-router-dom";
import { Wishlist } from "../../App";

interface ProfileWishlistsProps {
  wishlists: Wishlist[];
}

const ProfileWishlists: React.FC<ProfileWishlistsProps> = ({ wishlists }) => {
  console.log("WISHLISTS: ", wishlists);
  return (
    <div>
      <hr />
      {wishlists!.map((wishlist) => (
        <div key={wishlist._id}>
          <Link key={wishlist._id} to={`/wishlist/${wishlist._id}`}>
            <div className="hover:bg-purple-300 p-3">
              <h1>{wishlist.title}</h1>
              <p className="italic mb-2">
                Created {wishlist.created.toString()}
              </p>
              <h3>{wishlist.productInfos.length} Gifts</h3>
            </div>
          </Link>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default ProfileWishlists;
