const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const bcrypt = require("bcrypt");

const User = require("../models/userModel");
const sendEmail = require("../utils/email");
class userService {
  constructor(userModel) {
    this.userModel = userModel;
  }

  async register(user) {
    const { fullname, password, email, phone, address } = user;

    const userExists = await this.userModel.findOne({ email });
    if (userExists) {
      throw new Error("Email này đã tồn tại");
    }
    // const hashPassword = await bcrypt.hash(password, salt);
    const newUser = await this.userModel.create({
      fullname,
      password,
      email,
      phone,
      address,
    });
    return newUser;
  }
  async login(email, password) {
    const user = await this.userModel.findOne({ email }).select("+password");
    if (!user) {
      throw new Error("Email không tồn tại");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Sai mật khẩu");
    }
    user.password = undefined;
    return user;
  }
  async generateToken(user, secretKey, expires) {
    const token = jwt.sign({ id: user._id }, secretKey, { expiresIn: expires });
    return token;
  }
  async refreshToken(user) {
    const token = await this.generateToken(
      user,
      process.env.JWT_SECRET,
      process.env.JWT_EXPIRES
    );
    const refreshToken = await this.generateToken(
      user,
      process.env.JWT_REFRESH_KEY,
      process.env.JWT_REFRESH_EXPIRES
    );
    return { token, refreshToken };
  }

  async verifyToken(token, secretKey) {
    const decoded = await jwt.verify(token, secretKey);
    return decoded;
  }
  async forgotPassword(email, req, res) {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new Error("Email không tồn tại");
    }
    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });

    // 3) Send it to user's email
    const resetURL = `${req.get("origin")}/resetPassword/${resetToken}`;

    const message = `Bạn đã quên mật khẩu? Hãy gửi yêu cầu đặt lại mật khẩu của bạn tới: ${resetURL}.\nNếu bạn không yêu cầu đặt lại mật khẩu, hãy bỏ qua email này!`;

    try {
      await sendEmail({
        email: user.email,
        subject: "Đặt lại mật khẩu của bạn (Thời hạn 10 phút)",
        message,
      });
    } catch (err) {
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save({ validateBeforeSave: false });
      throw new Error("Gửi email thất bại");
    }
  }
  async resetPassword(token, password) {
    try {
      const hashedToken = crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");

      const user = await this.userModel.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: Date.now() },
      });

      if (!user) {
        throw new Error("Token đã hết hạn hoặc không tồn tại");
      }
      user.password = password;
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save();
      return user;
    } catch (err) {
      throw new Error("Token đã hết hạn hoặc không tồn tại");
    }
  }
}
module.exports = new userService(User);
