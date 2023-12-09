import React from "react";
import { Link } from "react-router-dom";
import { Wishlist } from "../../App";

interface ProfileWishlistsProps {
  wishlists: Wishlist[];
}

const ProfileWishlists: React.FC<ProfileWishlistsProps> = ({ wishlists }) => {
  const countGiftersInList = (wishlist: Wishlist) => {
    const gifters: string[] = [];
    wishlist.productInfos.forEach((pi) => {
      if (pi.buyerId && !gifters.includes(pi.buyerId)) {
        gifters.push(pi.buyerId);
      }
    });
    return gifters.length;
  };

  return (
    <div>
      <hr />
      {wishlists!.map((wishlist) => (
        <div key={wishlist.wid}>
          <Link key={wishlist.wid} to={`/wishlist/${wishlist.wid}`}>
            <div className="hover:bg-purple-300">
              <h1 className="pt-3">{wishlist.title}</h1>
              <p className="italic mb-2">Created {wishlist.created}</p>
              <h3>{wishlist.productInfos.length} Gifts</h3>
              <h3 className="pb-3">{countGiftersInList(wishlist)} Gifters</h3>
            </div>
          </Link>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default ProfileWishlists;
