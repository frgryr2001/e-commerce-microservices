const User = require("../models/userModel");

class AdminController {
	async deleteUser(req, res) {
		try {
			const user = await User.findById(req.params.id);
			if (!user) {
				return res.status(400).json({
					message: "Người dùng không tồn tại",
					status: "Thất bại",
				});
			}
			await user.active = false;
			await user.save();
			return res.status(200).json({
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

