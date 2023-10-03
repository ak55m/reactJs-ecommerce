import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userverificationSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      // required: true,
    },
    uniqueString: {
      type: String,
      // required: true,
      unique: true,
    },
    verified: {
      type: Boolean,
      // required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);


const UserVerification = mongoose.model("UserVerification", userverificationSchema);

export default UserVerification;