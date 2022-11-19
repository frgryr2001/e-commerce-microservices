const Voucher = require('../../models/voucherModel');
const { validationResult } = require('express-validator');

//
// @route   GET api/vouchers
// @desc    Get all vouchers
// @access  Public

class VoucherController {
	async getAllVouchers(req, res) {
		try {
			const vouchers = await Voucher.find();
			res.status(200).json({ status: 'Thành công', vouchers: vouchers });
		} catch (err) {
			console.error(err.message);
			res.status(400).json({
				status: 'Thất bại',
				message: 'Không tìm thấy mã giảm giá!',
			});
		}
	}

	//
	// @route   GET api/vouchers/:id
	// @desc    Get voucher by id
	// @access  Public

	async getVoucherByCode(req, res) {
		try {
			const voucher = await Voucher.findOne({ code: req.params.code });
			//const voucher = await Voucher.findOne({ code: req.params.id });
			if (!voucher) {
				return res.status(400).json({
					status: 'Thất bại',
					message: 'Không tìm thấy mã giảm giá!',
				});
			}
			res.status(200).json({ status: 'Thành công', voucher: voucher });
		} catch (err) {
			console.error(err.message);
			res.status(400).json({
				status: 'Thất bại',
				message: 'Không tìm thấy mã giảm giá!',
			});
		}
	}

	//
	// @route   POST api/vouchers
	// @desc    Create a voucher
	// @access  Private

	async createVoucher(req, res) {
		const errors = await validationResult(req);
		if (!errors.isEmpty()) {
			return res
				.status(400)
				.json({ status: 'Thất bại', message: errors.array()[0].msg });
		} else {
			const { name, code, discount, expiredDate, amount } = req.body;
			try {
				const voucher = new Voucher({
					name,
					code,
					discount,
					amount,
					expiredDate,
				});
				await voucher.save();
				res.status(200).json({
					voucher,
					status: 'Thành công',
					message: 'Tạo mã giảm giá thành công!',
				});
			} catch (err) {
				console.error(err.message);
				res.status(400).json({
					status: 'Thất bại',
					message: 'Không thể tạo mã giảm giá!',
				});
			}
		}
	}

	//
	// @route   PUT api/vouchers/:id
	// @desc    Update a voucher
	// @access  Private

	async updateVoucher(req, res) {
		const errors = await validationResult(req);
		if (!errors.isEmpty()) {
			return res
				.status(400)
				.json({ status: 'Thất bại', message: errors.array()[0].msg });
		} else {
			const { name, code, discount, expiredDate, amount } = req.body;

			try {
				const voucher = await Voucher.findById(req.params.id);
				if (!voucher) {
					return res.status(400).json({
						status: 'Thất bại',
						message: 'Không tìm thấy mã giảm giá!',
					});
				}

				voucher.name = name;
				voucher.code = code;
				voucher.discount = discount;
				voucher.expiredDate = expiredDate;
				voucher.amount = amount;

				await voucher.save();

				res.status(200).json({
					voucher,
					status: 'Thành công',
					message: 'Cập nhật mã giảm giá thành công!',
				});
			} catch (err) {
				console.error(err.message);
				res.status(400).json({
					status: 'Thất bại',
					message: 'Không thể cập nhật mã giảm giá!',
				});
			}
		}
	}

	//
	// @route   DELETE api/vouchers/:id
	// @desc    Delete a voucher
	// @access  Private
	async useVoucher(req, res) {
		try {
			const voucher = await Voucher.findOne({ code: req.params.id });
			if (!voucher) {
				return res.status(400).json({
					status: 'Thất bại',
					message: 'Không tìm thấy mã giảm giá!',
				});
			}
			if (voucher.amount <= 0) {
				return res.status(400).json({
					status: 'Thất bại',
					message: 'Mã giảm giá đã hết!',
				});
			}
			voucher.amount = voucher.amount - 1;
			await voucher.save();
			res.status(200).json({
				status: 'Thành công',
				message: 'Sử dụng mã giảm giá thành công!',
			});
		} catch (err) {
			console.error(err.message);
			res.status(400).json({
				status: 'Thất bại',
				message: 'Không thể sử dụng mã giảm giá!',
			});
		}
	}

	async deleteVoucher(req, res) {
		try {
			const voucher = await Voucher.findById(req.params.id);
			if (!voucher) {
				return res.status(400).json({
					status: 'Thất bại',
					message: 'Không tìm thấy mã giảm giá!',
				});
			}
			await voucher.remove();
			res.status(200).json({
				id: req.params.id,
				status: 'Thành công',
				message: 'Xóa mã giảm giá thành công!',
			});
		} catch (err) {
			console.error(err.message);
			res.status(400).json({
				status: 'Thất bại',
				message: 'Xóa mã giảm giá thất bại!',
			});
		}
	}
}
module.exports = new VoucherController();
