import fs, { existsSync } from "fs";
import path from "path";
const __dirname = path.resolve();
import User from "../models/User.js";
import Post from "../models/Post.js";

export const imageClearingMiddleware = (req, res, next) => {

  if(existsSync(path.join(__dirname, "/uploads"))){
    fs.readdir(path.join(__dirname, "/uploads"), (err, files) => {
      if (files.length > 0) {
        files.forEach(async (file) => {
          let filePath = "/uploads" + `/${file}`;
          const postImage = await Post.find({
            image: filePath,
          });
          const userImage = await User.find({
            profilePic: filePath,
          });
          if (postImage.length === 0 && userImage.length === 0) {
            fs.unlinkSync(path.join(__dirname, filePath));
          }
        });
      }
    });

  }
 
  next();
};
