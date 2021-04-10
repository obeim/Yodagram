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
          required: true,
        },
        user_name: {
          type: String,
          required: true,
        },
        comment: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

postSchema.methods.addComment = async function (comment) {
  await this.comments.push(comment);
  await this.save();
  return this;
};

postSchema.methods.deleteComment = async function (id, user) {
  const comment = await this.comments.find((one) => {
    return one._id.toString() === id;
  });
  if (!comment) {
    throw new Error("comment not found");
  }

  if (
    user.toString() !== comment.user_id.toString() &&
    this.user.toString() === user.toString()
  ) {
  } else if (user.toString() !== comment.user_id.toString()) {
    throw new Error("not allowed");
  }
  this.comments = await this.comments.filter(
    (one) => one._id.toString() !== id.toString()
  );

  await this.save();
  return this;
};
postSchema.methods.updateComment = async function (id, body, user) {
  const comment = await this.comments.find((one) => {
    return one._id.toString() === id.toString();
  });
  if (!comment) {
    throw new Error("comment not found");
  }
  console.log(user, comment.user_id);
  if (user.toString() !== comment.user_id.toString()) {
    throw new Error("not allowed");
  }

  this.comments = await this.comments.map((one) => {
    if (one._id.toString() === id.toString()) {
      one.comment = body;
    }
    return one;
  });
  return this;
};
const Post = mongoose.model("posts", postSchema);
export default Post;
