import axios from "axios";
import { User } from "./App";
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

export const createWishlist = async () => {};
