const userService = require("../services/userService");
const User = require("../models/userModel");

let refreshTokens = [];
const userController = {
  async register(req, res) {
    try {
      const { fullname, password, email, phone, address } = req.body;
      const user = await userService.register({
        fullname,
        password,
        email,
        phone,
        address,
      });
      res
        .status(201)
        .json({ data: user, status: "success", message: "Đăng ký thành công" });
    } catch (err) {
      res.status(500).json({ status: "fail", message: err.message });
    }
  },
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await userService.login(email, password);
      req.user = user;

      const token = await userService.generateToken(
        user,
        process.env.JWT_SECRET,
        process.env.JWT_EXPIRES
      );
      const refreshToken = await userService.generateToken(
        user,
        process.env.JWT_REFRESH_KEY,
        process.env.JWT_REFRESH_EXPIRES
      );
      refreshTokens.push(refreshToken);

      res.cookie("refreshToken", refreshToken, {
        expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
        secure: false, // set to true if your using https
        sameSite: "strict",
        httpOnly: true,
      });

      res.status(200).json({
        data: user,
        token,
        status: "success",
        message: "Đăng nhập thành công",
      });
    } catch (err) {
      res.status(500).json({ status: "fail", message: err.message });
    }
  },
  async refreshToken(req, res) {
    try {
      const { refreshToken } = req.cookies;

      const decoded = await userService.verifyToken(
        refreshToken,
        process.env.JWT_REFRESH_KEY
      );
      refreshTokens = refreshTokens.filter((token) => token !== refreshToken);

      const user = await User.findById(decoded.id);
      if (!user) {
        throw new Error("User not found");
      }
      req.user = user;

      const { token, refreshToken: newRefreshToken } =
        await userService.refreshToken(user);

      refreshTokens.push(newRefreshToken);

      res.cookie("refreshToken", newRefreshToken, {
        expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
        secure: false, // set to true if your using https
        sameSite: "strict",
        httpOnly: true,
      });
      res.status(200).json({
        data: user,
        token,
        status: "success",
        message: "Refresh token thành công",
      });
    } catch (err) {
      res.status(500).json({ status: "fail", message: err.message });
    }
  },
  async logout(req, res) {
    try {
      req.user = undefined;
      refreshTokens = refreshTokens.filter(
        (token) => token !== req.cookies.refreshToken
      );
      res.clearCookie("refreshToken");
      res
        .status(200)
        .json({ status: "success", message: "Đăng xuất thành công" });
    } catch (err) {
      res.status(500).json({ status: "fail", message: err.message });
    }
  },
  async forgotPassword(req, res) {
    try {
      const { email } = req.body;
      await userService.forgotPassword(email, req, res);
      res.status(200).json({
        status: "success",
        message: "Gửi email thành công",
      });
    } catch (err) {
      res.status(500).json({ status: "fail", message: err.message });
    }
  },
  async resetPassword(req, res) {
    try {
      const { token } = req.params;
      const { password } = req.body;
      await userService.resetPassword(token, password);
      res.status(200).json({
        status: "success",
        message: "Đổi mật khẩu thành công",
      });
    } catch (err) {
      res.status(500).json({ status: "fail", message: err.message });
    }
  },
};

module.exports = userController;
