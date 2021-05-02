import express from "express";
import {
  followUser,
  getAvatar,
  getProfile,
  getSuggest,
  login,
  register,
  search,
  updateProfile,
} from "../controller/userController.js";
import { requireAuth } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.put("/follow", requireAuth, followUser);
router.get("/suggest", requireAuth, getSuggest);
router.get("/search", requireAuth, search);
router.get("/:id", requireAuth, getProfile);
router.put("/:id", requireAuth, updateProfile);
router.get("/avatar/:id", requireAuth, getAvatar);

export default router;
