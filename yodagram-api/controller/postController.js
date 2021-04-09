import Post from "../models/Post.js";
import asyncHandler from "express-async-handler";
import User from "../models/User.js";
// @desc create new post
// @route POST /api/posts
// @access public
export const createPost = asyncHandler(async (req, res) => {
  const { image, info } = req.body;
  const id = req.user._id;

  const post = await Post.create({
    user: id,
    image,
    info: info || null,
  });
  res.json(post);
});

// @desc get all posts
// @route GET /api/posts
// @access public

export const getPosts = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  console.log(user.following);
  const posts = await Post.find().where("user").in(user.following);
  res.json(posts);
});

// @desc get a single post
// @route GET /api/posts/:id
// @access public
export const getSinglePost = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const post = await Post.findById(id);
  if (!post) {
    throw new Error("post not found");
  }
  res.json(post);
});

// @desc delete  post
// @route DELETE /api/posts/:id
// @access private
export const deletePost = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const user = req.user.id;

  const post = await Post.findById(id);

  if (post) {
    if (post.user.toString() !== user.toString()) {
      throw new Error("not allowed to delete");
    }
    await post.remove();
    res.json({ message: "post removed successfully" });
  } else {
    throw new Error("post not found");
  }
});

// @desc update  post
// @route PUT /api/posts/:id
// @access private
export const updatePost = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const user = req.user.id;
  const post = await Post.findById(id);
  if (post) {
    if (post.user.toString() !== user.toString()) {
      throw new Error("not allowed to update");
    }
    if (!req.body.info) {
      throw new Error("you didnt update anything");
    }
    post.info = req.body.info;
    const updatedPost = await post.save();
    res.json(updatedPost);
  } else {
    throw new Error("post not found");
  }
});
