const { check } = require('express-validator');
const axios = require('axios');
exports.feeShipValidator = [
	check('district_id') // district_id === 0 => vui lòng chọn quận huyện
		.exists()
		.withMessage('Vui lòng chọn quận huyện')
		.notEmpty()
		.withMessage('Vui lòng chọn quận huyện'),
	check('ward_id')
		.exists()
		.withMessage('Vui lòng chọn phường xã')
		.notEmpty()
		.withMessage('Vui lòng chọn phường xã'),
	// check('quantity')
	// 	.exists()
	// 	.withMessage('Giỏ hàng trống, vui lòng chọn sản phẩm')
	// 	.isInt({ min: 1 })
	// 	.withMessage('Giỏ hàng trống, vui lòng chọn sản phẩm'),
];

exports.orderValidator = [
	check('province_id') // province_id === 0 => vui lòng chọn tỉnh thành
		.exists()
		.withMessage('Vui lòng chọn tỉnh thành')
		.notEmpty()
		.withMessage('Vui lòng chọn tỉnh thành'),
	check('district_id')
		.exists()
		.withMessage('Vui lòng chọn quận huyện')
		.notEmpty()
		.withMessage('Vui lòng chọn quận huyện'),
	check('ward_id')
		.exists()
		.withMessage('Vui lòng chọn phường xã')
		.notEmpty()
		.withMessage('Vui lòng chọn phường xã'),
	check('address')
		.exists()
		.withMessage('Vui lòng nhập địa chỉ')
		.notEmpty()
		.withMessage('Vui lòng nhập địa chỉ'),
	check('voucher_code').custom(async value => {
		let voucher_data = await axios
			.get(`${process.env.API_PRODUCT_SERVICE}/api/voucher/${value}`, {
				headers: {
					'context-type': 'application/json',
				},
			})
			.catch(err => {
				throw new Error('Mã giảm giá không tồn tại');
			});
		if (voucher_data.data.amount <= 0) {
			throw new Error('Mã giảm giá đã hết');
		}
		if (voucher_data.data.expired_at < new Date()) {
			throw new Error('Mã giảm giá đã hết hạn');
		}
	}),
	check('products').custom(async value => {
		let products = value;
		for (let i = 0; i < products.length; i++) {
			let product_option_data = await axios
				.get(
					`${process.env.API_PRODUCT_SERVICE}/api/products/option/${products[i].product_option_id}`,
					{
						headers: {
							'context-type': 'application/json',
						},
					}
				)
				.catch(err => {
					throw new Error('Sản phẩm không tồn tại');
				});
			if (!product_option_data.data.product_option) {
				throw new Error('Sản phẩm không tồn tại');
			}
			if (product_option_data.data.product_option.quantity < products[i].quantity) {
				throw new Error(`Sản phẩm không đủ số lượng để đặt hàng!`);
			}
		}
	}),
];
