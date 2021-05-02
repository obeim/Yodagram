import express from "express";
import dotenv from "dotenv";
import path from "path";
import uploadRoute from "./routes/uploadRoute.js";
import usersRoute from "./routes/usersRoute.js";
import postRoute from "./routes/postRoute.js";
import { errorHandler, notFound } from "./middlewares/errorMiddleware.js";
import connectDB from "./config/db.js";
dotenv.config();
connectDB();
const app = express();
const __dirname = path.resolve();
const port = process.env.PORT || 5000;

app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send(
    "<h1>Yodagram api is running <h1/> <h2>Routes :</h2><h3>/api/users :</h3><h3>/api/upload :</h3><h3>/api/posts :</h3>"
  );
});
app.use("/api/upload", uploadRoute);
app.use("/api/users", usersRoute);
app.use("/api/posts", postRoute);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`yodagram api runnig on port ${port} `);
});
