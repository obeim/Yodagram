import express from "express";
import dotenv from "dotenv";
import uploadRoute from "./routes/uploadRoute.js";
import usersRoute from "./routes/usersRoute.js";
import postRoute from "./routes/postRoute.js";
import { errorHandler, notFound } from "./middlewares/errorMiddleware.js";
import connectDB from "./config/db.js";
dotenv.config();
connectDB();
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/upload", uploadRoute);
app.use("/api/users", usersRoute);
app.use("/api/posts", postRoute);
app.use(notFound);
app.use(errorHandler);
app.listen(3000, () => {
  console.log(`yodagram api runnig on port ${port} `);
});
