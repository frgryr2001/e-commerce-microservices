// user model
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const crypto = require("crypto");
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

userSchema.pre(/^find/, function (next) {
  // this points to the current query
  this.find({ active: { $ne: false } });
  next();
});

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  // Hash token and set to resetPasswordToken field
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // date vietnamese
  const dateVietNam = moment.tz(Date.now(), "Asia/Ho_Chi_Minh");
  this.passwordResetExpires = dateVietNam + 10 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
