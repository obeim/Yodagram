import { Router } from "express";
import asyncHandler from "express-async-handler";
import {
  createPost,
  deletePost,
  getPosts,
  getSinglePost,
  updatePost,
  addComment,
  deleteComment,
  updateComment,
} from "../controller/postController.js";
import { requireAuth } from "../middlewares/authMiddleware.js";
import { imageClearingMiddleware } from "../middlewares/imageClearingMiddleware.js";

const router = Router();
router.post("/", requireAuth, createPost);
router.use(imageClearingMiddleware);
router.get("/", requireAuth, getPosts);
router.get("/:id", requireAuth, getSinglePost);
router.delete("/:id", requireAuth, deletePost);
router.put("/:id", requireAuth, updatePost);

///comments
router.post("/:id/comments", requireAuth, addComment);
router.delete("/:id/comments/:commentID", requireAuth, deleteComment);
router.put("/:id/comments/:commentID", requireAuth, updateComment);

export default router;
