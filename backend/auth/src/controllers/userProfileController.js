const User = require('../models/userModel');
const { validationResult } = require('express-validator');

class UserProfilesController {
	async getProfile(req, res) {
		try {
			console.log(req.user);
			const user = await User.findById(req.user.id);
			res.status(200).json({
				user: user,
				status: 'success',
				message: 'Lấy thông tin người dùng thành công',
			});
		} catch (err) {
			console.error(err.message);
			res.status(400).json({
				message: 'Lấy thông tin người dùng không thành công',
				status: 'fail',
			});
		}
	}

	async updateProfile(req, res) {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({
				status: 'Thất bại',
				message: errors.array()[0].msg,
			});
		} else {
			try {
				const user = await User.findById(req.user.id);
				if (!user) {
					return res.status(400).json({
						message: 'Người dùng không tồn tại',
						status: 'fail',
					});
				}

				const { fullname, phone, address } = req.body;
				console.log(req.body);
				user.fullname = fullname;
				user.phone = phone;
				user.address = address;
				await user.save();

				return res.status(200).json({
					user: user,
					status: 'Thành công',
					message: 'Cập nhật thông tin thành công',
				});
			} catch (err) {
				console.error(err.message);
				res.status(400).json({
					message: 'Cập nhật thông tin không thành công',
					status: 'fail',
				});
			}
		}
	}
}

module.exports = new UserProfilesController();
