import User from "../models/User.js";
import Post from "../models/Post.js";
import asyncHandler from "express-async-handler";
import generateToken from "../utlis/generateToken.js";

// @desc login user
// @route POST /api/users/login
// @access public

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
      following: user.following,
    });
  } else {
    res.status(401);
    throw new Error("incorrect email or password");
  }
});

// @desc register user
// @route POST /api/users/register
// @access public

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
  user.follow(user._id);
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

// @desc get user profile
// @route GET /api/users/:id
// @access public

export const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    const posts = await Post.find({ user: user._id });
    res.json({
      _id: user._id,
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

// @desc update profile
// @route PUT /api/users/:id
// @access private

export const updateProfile = asyncHandler(async (req, res) => {
  let user = await User.findById(req.params.id);
  if (user) {
    user.username = req.body.username || user.username;
    if (user._id.toString() !== req.user._id.toString()) {
      throw new Error("not allowed");
    } else {
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
    }
  } else {
    res.status(401);
    throw new Error("user not found");
  }
});

// @desc follow user
// @route PUT /api/users/follow/:id
// @access private

export const followUser = asyncHandler(async (req, res) => {
  const followID = req.body.followID;
  const user = await User.findById(req.user._id).select("-password");
  const updatedUser = await user.follow(followID);
  res.status(200).json(updatedUser);
});

// @desc search user
// @route GET /api/users?
// @access private

export const search = asyncHandler(async (req, res) => {
  const { key, page, limit = 10 } = req.query;

  const users = await User.find({
    username: {
      $regex: key,
      $options: "i",
    },
  })
    .limit(10)
    .skip((page - 1) * limit)
    .exec();
  const count = await User.countDocuments();
  res.json({
    users,
    currentPage: page,
    totalPages: count / limit,
  });
});

export const getAvatar = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  res.json({
    username: user.username,
    profilePic: user.profilePic,
  });
});

export const getSuggest = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});
