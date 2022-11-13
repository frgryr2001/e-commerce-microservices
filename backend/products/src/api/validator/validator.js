const upload = require('../middlewares/uploadMiddleware');
const { check, body } = require('express-validator');
exports.uploadValidator = (req, res, next) => {
	upload(req, res, err => {
		if (err instanceof multer.MulterError) {
			console.log(err);
			return res.json({ status: 'Thất bại', errors: err.message });
		} else if (err) {
			console.log(err);
		} else {
			console.log(req.file);
		}
	});
	return next();
};

exports.productValidator = [
	check('name')
		.exists()
		.withMessage('Vui lòng nhập tên sản phẩm')
		.notEmpty()
		.withMessage('Vui lòng nhập tên sản phẩm'),

	check('description', 'Mô tả không được để trống')
		.exists()
		.withMessage('Vui lòng nhập mô tả sản phẩm')
		.notEmpty()
		.withMessage('Vui lòng nhập mô tả sản phẩm'),

	check('price')
		.exists()
		.withMessage('Vui lòng nhập mô tả sản phẩm')
		.notEmpty()
		.withMessage('Vui lòng nhập mô tả sản phẩm')
		.isInt({ min: 0 })
		.withMessage('Vui lòng nhập giá sản phẩm là số ( nhỏ nhất là 0)'),

	check('category_id')
		.exists()
		.withMessage('Vui lòng chọn danh mục sản phẩm')
		.notEmpty()
		.withMessage('Vui lòng chọn danh mục sản phẩm'),

	check('product_options')
		.exists()
		.withMessage('Vui lòng nhập kiểu sản phẩm')
		.custom(raw => {
			const value = JSON.parse(JSON.stringify(raw));
			if (value.length === 0) {
				throw new Error('Vui lòng nhập kiểu sản phẩm');
			}
			//console.log(value)
			value.forEach(item => {
				if (!item.size || !item.quantity) {
					throw new Error('Vui lòng nhập kiểu sản phẩm và số lượng');
				}
				if (item.size === '' || item.quantity === '') {
					throw new Error('Vui lòng nhập đủ thông tin kiểu sản phẩm');
				}
			});
			return true;
		}),

	check('manufacture')
		.exists()
		.withMessage('Vui lòng nhà sản xuất')
		.notEmpty()
		.withMessage('Vui lòng nhà sản xuất'),

	check('images').custom(async (file, { req }) => {
		if (!req.files) {
			throw new Error('Vui lòng thêm ảnh');
		} else {
			const filetypes = /jpeg|jpg|png|gif/;
			req.files.forEach(file => {
				if (!filetypes.test(file.mimetype)) {
					throw new Error(
						'Ảnh không hợp lệ! Chỉ cho phép upload ảnh png/jpg/jpeg/gif'
					);
				} else if (file.size > 1024 * 1024 * 8) {
					throw new Error('Ảnh không được quá 8MB');
				}
			});
		}
		return true;
	}),
];

exports.updateProductValidator = [
	check('name')
		.exists()
		.withMessage('Vui lòng nhập tên sản phẩm')
		.notEmpty()
		.withMessage('Vui lòng nhập tên sản phẩm'),

	check('description', 'Mô tả không được để trống')
		.exists()
		.withMessage('Vui lòng nhập mô tả sản phẩm')
		.notEmpty()
		.withMessage('Vui lòng nhập mô tả sản phẩm'),

	check('price')
		.exists()
		.withMessage('Vui lòng nhập mô tả sản phẩm')
		.notEmpty()
		.withMessage('Vui lòng nhập mô tả sản phẩm')
		.isInt({ min: 0 })
		.withMessage('Vui lòng nhập giá sản phẩm là số ( nhỏ nhất là 0)'),

	check('category_id')
		.exists()
		.withMessage('Vui lòng chọn danh mục sản phẩm')
		.notEmpty()
		.withMessage('Vui lòng chọn danh mục sản phẩm'),

	check('product_options')
		.exists()
		.withMessage('Vui lòng nhập kiểu sản phẩm')
		.custom(raw => {
			const value = JSON.parse(JSON.stringify(raw));
			if (value.length === 0) {
				throw new Error('Vui lòng nhập kiểu sản phẩm');
			}
			//console.log(value)
			value.forEach(item => {
				if (!item.size || !item.quantity) {
					throw new Error('Vui lòng nhập kiểu sản phẩm và số lượng');
				}
				if (item.size === '' || item.quantity === '') {
					throw new Error('Vui lòng nhập đủ thông tin kiểu sản phẩm');
				}
			});
			return true;
		}),

	check('manufacture')
		.exists()
		.withMessage('Vui lòng nhà sản xuất')
		.notEmpty()
		.withMessage('Vui lòng nhà sản xuất'),

	check('images').custom(async (file, { req }) => {
		const filetypes = /jpeg|jpg|png|gif/;
		req.files.forEach(file => {
			if (!filetypes.test(file.mimetype)) {
				throw new Error('Ảnh không hợp lệ! Chỉ cho phép upload ảnh png/jpg/jpeg/gif');
			} else if (file.size > 1024 * 1024 * 8) {
				throw new Error('Ảnh không được quá 8MB');
			}
		});

		return true;
	}),
];