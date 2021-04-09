import User from "../models/User.js";
import Post from "../models/Post.js";
import asyncHandler from "express-async-handler";
import generateToken from "../utlis/generateToken.js";

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      profilePic: user.profilePic,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("incorrect email or password");
  }
});

export const register = asyncHandler(async (req, res) => {
  const { email, password, username, birth, profilePic } = req.body;

  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(401);
    throw new Error("user already exist");
  }

  const user = await User.create({
    email,
    password,
    username,
    birth,
    profilePic,
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      email: user.email,
      username: user.username,
      brith: user.birth,
      profilePic: user.profilePic,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("invalid user data");
  }
});

export const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    const posts = await Post.find({ user: user._id });
    res.json({
      id: user._id,
      username: user.username,
      email: user.email,
      bio: user.bio,
      followers: user.followers,
      following: user.following,
      profilePic: user.profilePic,
      posts,
    });
  } else {
    res.status(401);
    throw new Error("user not found");
  }
});

export const updateProfile = asyncHandler(async (req, res) => {
  let user = await User.findById(req.user._id);
  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    user.profilePic = req.body.profilePic || user.profilePic;
    user.bio = req.body.bio || user.bio;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const upadatedUser = await user.save();
    res.json({
      id: upadatedUser._id,
      username: upadatedUser.username,
      email: upadatedUser.email,
      profilePic: upadatedUser.profilePic,
      bio: upadatedUser.bio,
      message: "updated successfully",
    });
  } else {
    res.status(401);
    throw new Error("invalid user data");
  }
});

export const followUser = asyncHandler(async (req, res) => {
  const followID = req.params.id;
  const user = await User.findById(req.user._id);
  const updatedUser = await user.follow(followID);
  res.json(updatedUser);
});
