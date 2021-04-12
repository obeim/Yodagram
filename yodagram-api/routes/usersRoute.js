import express from "express";
import {
  followUser,
  getProfile,
  login,
  register,
  search,
  updateProfile,
} from "../controller/userController.js";
import { requireAuth } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.get("/search", requireAuth, search);
router.get("/:id", requireAuth, getProfile);
router.put("/:id", requireAuth, updateProfile);
router.put("/follow/:id", requireAuth, followUser);

export default router;
