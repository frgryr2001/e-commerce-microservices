const { check } = require('express-validator');
const User = require('../models/userModel');
exports.userValidator = [
	check('fullname')
		.exists()
		.withMessage('Vui lòng nhập họ tên')
		.notEmpty()
		.withMessage('Vui lòng nhập họ tên'),
	check('phone')
		.exists()
		.withMessage('Vui lòng nhập sdt')
		.notEmpty()
		.withMessage('Vui lòng nhập sdt')
		.isLength({ min: 10, max: 10 })
		.withMessage('Số điện thoại phải có 10 số')
		.custom(async (value,{req}) => {
			const user = await User.findOne({
				phone: value,
			});
			if (user) {
				if (user.id != req.user.id) {
					return Promise.reject('Số điện thoại đã tồn tại');
				}
			}
			return true;
		}),
	check('address')
		.exists()
		.withMessage('Vui lòng nhập địa chỉ')
		.notEmpty()
		.withMessage('Vui lòng nhập địa chỉ'),
];
