import { Router } from "express";
import asyncHandler from "express-async-handler";
import {
  createPost,
  deletePost,
  getPosts,
  getSinglePost,
  updatePost,
} from "../controller/postController.js";
import { requireAuth } from "../middlewares/authMiddleware.js";

const router = Router();
router.get("/", requireAuth, getPosts);
router.post("/", requireAuth, createPost);
router.get("/:id", requireAuth, getSinglePost);
router.delete("/:id", requireAuth, deletePost);
router.put("/:id", requireAuth, updatePost);

export default router;
