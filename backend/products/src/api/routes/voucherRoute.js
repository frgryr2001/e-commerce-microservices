const express = require('express');
const router = express.Router();

const { voucherValidator, updateVoucherValidator } = require('../validator/validator');

const isAuthenticated = require('../middlewares/isAuthenticated');

const isAdmin = require('../middlewares/roleCheck');

const voucherController = require('../controllers/voucherController');


// Lấy tất cả voucher - all
router.get('/', voucherController.getAllVouchers);
// Lấy voucher theo id - all
router.get('/:code', voucherController.getVoucherByCode);
// Tạo voucher - admin
router.post(
	'/',
	isAuthenticated,
	isAdmin,
	voucherValidator,
	voucherController.createVoucher
);
// Cập nhật voucher - admin
router.put(
	'/:id',
	isAuthenticated,
	isAdmin,
	updateVoucherValidator,
	voucherController.updateVoucher
);
// Xóa voucher - admin
router.delete('/:id', isAuthenticated, isAdmin, voucherController.deleteVoucher);
// Dùng voucher - all
router.get('/use/:id', voucherController.useVoucher);

module.exports = router;
