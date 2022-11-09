// user model
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    fullname: {
      type: String,
      required: true,
      minlength: 2,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      select: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
    },
    role: {
      type: String,
      required: true,
      enum: ["user", "admin"],
      default: "user",
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 10,
    },
    address: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    avatar: {
      type: String,
    },
    passwordResetToken: String, // reset password
    passwordResetExpires: Date, // expires reset password

    // active : la tai khoan dieu duoc kich hoat , nếu xóa tài khoản thì active = false
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
  },

  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
