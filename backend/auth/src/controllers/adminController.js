const User = require("../models/userModel");

class AdminController {
  // get all users
  async getAllUsers(req, res) {
    try {
      const users = await User.find({ role: "user" }).select("-password");
      res.json({ users, message: "Lấy danh sách thành công" });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  async deleteUser(req, res) {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(400).json({
          message: "Người dùng không tồn tại",
          status: "Thất bại",
        });
      }
      user.active = false;

      await user.save();
      return res.status(200).json({
        id: user._id,
        status: "Thành công",
        message: "Xóa người dùng thành công",
      });
    } catch (err) {
      console.error(err.message);
      res.status(400).json({
        message: "Xóa người dùng không thành công",
        status: "Thất bại",
      });
    }
  }
}
module.exports = new AdminController();
