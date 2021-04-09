import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
const { isEmail } = validator;
const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "username is required"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: [true, "email already used"],
      validate: [isEmail, "please enter a valid email"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
      minLength: [6, "password must not be less than 6"],
    },
    birth: {
      type: Date,
      required: [true, "birth date is required"],
    },
    bio: {
      type: "String",
      default: "",
    },
    profilePic: {
      type: String,
      default: null,
    },
    following: {
      type: [
        {
          _id: {
            type: mongoose.SchemaTypes.ObjectId,
          },
        },
      ],
      default: [],
    },
    followers: {
      type: [
        {
          _id: {
            type: mongoose.SchemaTypes.ObjectId,
          },
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);
userSchema.methods.matchPassword = async function (enterdPassword) {
  return await bcrypt.compare(enterdPassword, this.password);
};
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  let hashedPassword = await bcrypt.hash(this.password, salt);
  this.password = hashedPassword;
});

const User = mongoose.model("users", userSchema);
export default User;
