import expressAsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
export const requireAuth = expressAsyncHandler(async (req, res, next) => {
  let token;
  if (req.headers.authorization) {
    token = req.headers.authorization.split(" ")[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.payload).select("-password");
      next();
    } catch (err) {
      res.status(401);
      throw new Error("not Authorized , token failed");
    }
  } else {
    res.status(401);
    throw new Error("no token found ");
  }
});
