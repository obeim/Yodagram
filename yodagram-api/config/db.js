import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log(`connected to DB ${conn.connection.host}`);
  } catch (err) {
    console.log(err);
  }
};

export default connectDB;
