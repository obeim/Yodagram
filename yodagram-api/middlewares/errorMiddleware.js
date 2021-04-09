export const notFound = (req, res, next) => {
  const error = new Error(`Not Found ${req.originalUrl}`);
  res.status(404);
  next(error);
};
export const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);

  if (err.kind === "ObjectId") {
    res.json({
      message: "invalid id",
      stack: process.env.NODE_ENV === "production" ? null : err.stack,
    });
  } else if (err.code === 11000) {
    if (err.keyPattern.username) {
      res.json({
        message: "username is used",
        stack: process.env.NODE_ENV === "production" ? null : err.stack,
      });
    }
  } else {
    res.json({
      message: err.message,
      stack: process.env.NODE_ENV === "production" ? null : err.stack,
    });
  }
};
