import Post from "../models/Post.js";
import asyncHandler from "express-async-handler";

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

export const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find();
  res.json(posts);
});

export const getSinglePost = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const post = await Post.findById(id);
  if (!post) {
    throw new Error("post not found");
  }
  res.json(post);
});

export const deletePost = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const post = await Post.findById(id);
  if (post) {
    await post.remove();
    res.json({ message: "post removed successfully" });
  } else {
    throw new Error("post not found");
  }
});

export const updatePost = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const post = await Post.findById(id);
  if (!req.body.info) {
    throw new Error("you didnt update anything");
  }
  post.info = req.body.info;
  const updatedPost = await post.save();
  res.json(updatedPost);
});
