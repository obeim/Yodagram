import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    image: {
      type: String,
      required: [true, "you cant post without an image"],
    },
    info: {
      type: String,
      default: null,
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      required: [true, "userid required"],
    },
    comments: [
      {
        user_id: {
          type: mongoose.SchemaTypes.ObjectId,
        },
        user_name: {
          type: String,
        },
        body: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const Post = mongoose.model("posts", postSchema);
export default Post;
