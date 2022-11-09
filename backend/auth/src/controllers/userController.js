const userService = require("../services/userService");

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
};

module.exports = userController;
