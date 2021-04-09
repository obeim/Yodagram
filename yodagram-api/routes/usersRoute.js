import express from "express";
import {
  followUser,
  getProfile,
  login,
  register,
  updateProfile,
} from "../controller/userController.js";
import { requireAuth } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.get("/profile", requireAuth, getProfile);
router.put("/profile", requireAuth, updateProfile);
router.put("/follow/:id", requireAuth, followUser);
export default router;
