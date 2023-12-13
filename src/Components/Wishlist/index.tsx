import React from "react";
import { CurrentUserContext, ProductInfo, Wishlist } from "../../App";
import ProductCard from "../ProductCard";
import { Link, useNavigate, useParams } from "react-router-dom";
import ProductRemoveButton from "./ProductRemoveButton";
import { useState, useEffect } from "react";
import BuyingButton from "./BuyingButton";
import {
  getWishlist,
  followWishlist,
  unfollowWishlist,
  getWishlistFollowers,
  getProduct,
  updateWishlist,
} from "../../client";

const WishlistView: React.FC = () => {
  //get wishlist
  const { wishlistId } = useParams();
  const emptyWishlist = {
    title: "",
    description: "",
    owner: "",
    productInfos: [
      {
        productId: "",
        buyerId: "",
      },
    ],
    created: new Date(),
  } as Wishlist;
  const [wishlist, setWishlist] = useState(emptyWishlist);
  const navigate = useNavigate();

  const fetchWishlist = () => {
    if (wishlistId) {
      const w = getWishlist(wishlistId);
      w.then((res) => {
        if (res) {
          setWishlist(res);
        }
      });
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, [wishlistId]);

  //get products
  const [products, setProducts] = useState<ProductInfo[]>([]);
  const fetchProducts = () => {
    console.log("fetching products for wishlist: ", wishlist);
    Promise.all(
      wishlist.productInfos.map((info) => {
        if (info.productId === "") return null;
        return getProduct(info.productId);
      })
    ).then((res) => {
      console.log("products:", res);
      setProducts(res.filter((p) => p != null) as ProductInfo[]);
    });
  };
  useEffect(fetchProducts, [wishlist]);

  //get viewing state
  const { user } = React.useContext(CurrentUserContext);
  let myWishlist = user && wishlist.owner === user.username; //requires a logged in user
  let showBuyButton = true; //user && !myWishlist && !user.isWishing; //requires a logged in user in gifting mode who is not the owner of the list

  //get wishlist followers
  const empty: string[] = [];
  const [wishlistFollowers, setWishlistFollowers] = useState(empty);
  const fetchWishlistFollowers = () => {
    const followers = getWishlistFollowers(wishlist._id);
    console.log("followers:", followers);
    followers.then((res) => {
      if (res) {
        setWishlistFollowers(res.map((f) => f.follower));
      }
    });
  };
  useEffect(fetchWishlistFollowers, [wishlist]);

  //follow wishlist
  const followWishlistHandler = () => {
    if (user) {
      followWishlist(user.username, wishlist._id).then((res) => {
        console.log("res:", res);
        fetchWishlistFollowers();
      });
    } else {
      navigate("/login");
    }
  };

  //unfollow wishlist
  const unfollowWishlistHandler = () => {
    if (user) {
      unfollowWishlist(user.username, wishlist._id).then((res) => {
        console.log("res:", res);
        fetchWishlistFollowers();
      });
    } else {
      navigate("/login");
    }
  };

  //remove product from wishlist
  const removeProductFromWishlist = (productId: string) => {
    const newWishlist = { ...wishlist };
    newWishlist.productInfos = newWishlist.productInfos.filter(
      (info) => info.productId !== productId
    );
    updateWishlist(newWishlist).then((res) => {
      if (res) {
        console.log("Updated wishlist: ", res);
        setWishlist(newWishlist);
      }
    });
  };

  //set user as product buyer
  const setProductBuyer = (productId: string, buyerId: string) => {
    console.log("Setting product buyer: ", productId, buyerId);
    const newWishlist = { ...wishlist };
    newWishlist.productInfos = newWishlist.productInfos.map((info) => {
      if (info.productId === productId) {
        return { ...info, buyerId };
      } else {
        return info;
      }
    });
    console.log("NEW WISHLIST: ", newWishlist);
    updateWishlist(newWishlist).then((res) => {
      if (res) {
        console.log("Updated wishlist: ", res);
        setWishlist(newWishlist);
      }
    });
  };

  //set product buyer to null
  const removeProductBuyer = (productId: string) => {
    const newWishlist = { ...wishlist };
    newWishlist.productInfos = newWishlist.productInfos.map((info) => {
      if (info.productId === productId) {
        return { ...info, buyerId: null };
      } else {
        return info;
      }
    });
    updateWishlist(newWishlist).then((res) => {
      if (res) {
        console.log("Updated wishlist: ", res);
        setWishlist(newWishlist);
      }
    });
  };

  return (
    <div className="container m-auto mb-5">
      {/*Intro*/}
      <h1 className="text-5xl font-bold mb-2">{wishlist.title}</h1>
      <div className="flex justify-between items-center mb-4">
        <Link
          to={`/profile/${wishlist.owner}`}
          className="text-2xl font-semibold hover:text-purple-600"
        >
          by {wishlist.owner}
        </Link>
        <div className="flex items-center">
          <p className="text-xl font-semibold me-4">
            {wishlistFollowers.length} followers
          </p>
          {user &&
            !myWishlist &&
            !wishlistFollowers.includes(user.username) && (
              <button
                onClick={followWishlistHandler}
                className="inline-flex justify-center rounded-md shadow-sm px-3 py-2 bg-amber-600 text-sm font-medium text-white hover:bg-amber-500"
              >
                Save this list
              </button>
            )}
          {user && !myWishlist && wishlistFollowers.includes(user.username) && (
            <button
              onClick={unfollowWishlistHandler}
              className="inline-flex justify-center rounded-md shadow-sm px-3 py-2 bg-gray-400 text-sm font-medium text-white hover:bg-gray-500"
            >
              Unsave this list
            </button>
          )}
        </div>
      </div>
      <hr />
      <p className="text-lg italic mt-4 mb-4">
        Created {wishlist.created.toString()}
      </p>
      <p className="text-lg mb-4">{wishlist.description}</p>

      {/*Products*/}
      <div className="container m-auto">
        <div className="flex flex-wrap gap-3 m-auto">
          {products.length === 0 && (
            <>
              <Link
                to="/"
                className="inline-flex justify-center rounded-md shadow-sm px-3 py-2 bg-teal-600 text-sm font-medium text-white hover:bg-teal-500"
              >
                Add Products!
              </Link>
            </>
          )}
          {products.length > 0 &&
            products.map((product) => (
              <ProductCard
                key={product.tcin}
                product={product}
                bottomContent={
                  myWishlist ? (
                    <ProductRemoveButton
                      productId={product.tcin}
                      onRemove={removeProductFromWishlist}
                    />
                  ) : (
                    showBuyButton && (
                      <BuyingButton
                        productInfo={
                          wishlist.productInfos.find(
                            (info) => info.productId === product.tcin
                          ) || null
                        }
                        setProductBuyer={setProductBuyer}
                        removeProductBuyer={removeProductBuyer}
                      />
                    )
                  )
                }
              />
            ))}
        </div>
      </div>
      <div className="flex flex-wrap gap-3 m-auto"></div>
    </div>
  );
};

export default WishlistView;
