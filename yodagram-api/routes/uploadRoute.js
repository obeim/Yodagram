import path from "path";
import express from "express";
import multer from "multer";
import fs from "fs";
const __dirname = path.resolve();

const router = express.Router();
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Images only!");
  }
}
const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

router.post(
  "/",
  (req, res, next) => {
    const dir = path.join(__dirname, "/uploads");
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    next();
  },
  upload.single("image"),
  (req, res) => {
    const imagePath = req.file.path.replace("\\", "/");

    res.send(`/${imagePath}`);
  }
);

export default router;
