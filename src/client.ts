import axios from "axios";
import { ProductInfo, User, Wishlist } from "./App";
import { SignUpFormValues } from "./Components/SignUp";
import { LoginFormValues } from "./Components/Login";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:4000";

export type FollowRelation = {
  follower: string;
  followed: string;
};

export const searchForPeople = async (searchTerm: string) => {
  const searchResults = await axios.post(`${BACKEND_URL}/user/search`, {
    searchTerm: searchTerm,
  });
  console.log(searchResults.data);
  return searchResults.data as User[];
};

export const signUp = async (user: SignUpFormValues) => {
  const profile = await axios.post(`${BACKEND_URL}/user/signup`, user);
  console.log(profile.data);
  return profile.data as User;
};

export const signIn = async (credentials: LoginFormValues) => {
  const profile = await axios.post(`${BACKEND_URL}/user/signin`, credentials);
  console.log(profile.data);
  return profile.data as User;
};

export const follow = async (follower: string, followed: string) => {
  const followRelation = await axios.post(`${BACKEND_URL}/user/follow`, {
    follower,
    followed,
  });
  console.log("new follow", followRelation);
  return followRelation;
};

export const unfollow = async (follower: string, followed: string) => {
  const followRelation = await axios.post(`${BACKEND_URL}/user/unfollow`, {
    follower,
    followed,
  });
  console.log("new unfollow", followRelation);
  return followRelation;
};

export const getUser = async (username: string) => {
  const user = await axios.get(`${BACKEND_URL}/user/${username}`);
  return user.data as User;
};

export const getFollowers = async (username: string) => {
  const followers = await axios.get(
    `${BACKEND_URL}/user/followers/${username}`
  );
  return followers.data as FollowRelation[];
};

export const getFollowings = async (username: string) => {
  const followings = await axios.get(
    `${BACKEND_URL}/user/following/${username}`
  );
  return followings.data as FollowRelation[];
};

export const createWishlist = async (
  title: string,
  description: string,
  owner: string
) => {
  console.log("creating wishlist");
  const wishlist = await axios.post(`${BACKEND_URL}/wishlists`, {
    title,
    description,
    owner,
  });
  return wishlist.data;
};

export const getWishlist = async (id: string) => {
  const wishlist = await axios.get(`${BACKEND_URL}/wishlist/${id}`);
  console.log("Wishlist from axios:", wishlist);
  return wishlist.data as Wishlist;
};

export const getWishlistsForUser = async (username: string) => {
  const wishlists = await axios.get(`${BACKEND_URL}/wishlists/${username}`);
  console.log("Wishlists from axios:", wishlists);
  return wishlists.data as Wishlist[];
};

export const getWishlistsFollowedByUser = async (username: string) => {
  const wishlistFollows = await axios
    .get(`${BACKEND_URL}/wishlist/following/${username}`)
    .then((res) => res.data);
  console.log("Wishlist follows:", wishlistFollows);
  const wishlists = await Promise.all(
    wishlistFollows.map(async (follow: any) => {
      const wishlist = await getWishlist(follow.wishlistId);
      return wishlist;
    })
  );
  return wishlists as Wishlist[];
};

export const followWishlist = async (follower: string, wishlistId: string) => {
  const followRelation = await axios.post(`${BACKEND_URL}/wishlist/follow`, {
    follower,
    wishlistId,
  });
  console.log("new follow", followRelation);
  return followRelation;
};

export const unfollowWishlist = async (
  follower: string,
  wishlistId: string
) => {
  const followRelation = await axios.post(`${BACKEND_URL}/wishlist/unfollow`, {
    follower,
    wishlistId,
  });
  console.log("new unfollow", followRelation);
  return followRelation;
};

export const getWishlistFollowers = async (wishlistId: string) => {
  const followers = await axios.get(
    `${BACKEND_URL}/wishlist/followers/${wishlistId}`
  );
  console.log("followers data", followers.data);
  return followers.data as FollowRelation[];
};

export const updateUser = async (user: User) => {
  const updatedUser = await axios.put(
    `${BACKEND_URL}/user/${user.username}`,
    user
  );
  console.log("updated user", updatedUser);
  return updatedUser.data;
};

export const updateWishlist = async (wishlist: Wishlist) => {
  const updatedWishlist = await axios.put(
    `${BACKEND_URL}/wishlists/${wishlist._id}`,
    wishlist
  );
  console.log("updated wishlist", updatedWishlist);
  return updatedWishlist.data;
};

export const addProduct = async (product: ProductInfo) => {
  const newProduct = await axios.post(`${BACKEND_URL}/products`, product);
  console.log("new product", newProduct);
  return newProduct.data;
};

export const getProduct = async (id: string) => {
  try {
    const product = await axios.get(`${BACKEND_URL}/products/${id}`);
    return product.data;
  } catch (error) {
    console.log("ERROR");
    console.log(error);
    return null;
  }
};
