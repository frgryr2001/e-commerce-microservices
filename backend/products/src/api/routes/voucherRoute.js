const express = require('express');
const router = express.Router();

const { voucherValidator, updateVoucherValidator } = require('../validator/validator');

const isAuthenticated = require('../middlewares/isAuthenticated');

const isAdmin = require('../middlewares/roleCheck');

const voucherController = require('../controllers/voucherController');


// Lấy tất cả voucher - all
/**
 * @swagger
 * /api/voucher/:
 *   get:
 *     summary: Get all voucher
 *     tags: [Voucher]
 *     responses:
 *       200:
 *         description: Get all voucher success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                    type: string
 *                    default: Thành công
 *                 voucher:
 *                    type: array
 *                    default: []
 *       400:
 *         description: Get all voucher fail
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                    type: string
 *                    default: Thất bại
 *                 message:
 *                    type: string
 *                    default: Lấy danh sách voucher thất bại
 *       500:
 *         description: Get all voucher error
 */
router.get('/', voucherController.getAllVouchers);
// Lấy voucher theo code - all
/**
 * @swagger
 * /api/voucher/{code}:
 *   get:
 *     summary: Get all voucher
 *     tags: [Voucher]
 *     parameters:
 *     - in: path
 *       name: code
 *       schema:
 *         type: string
 *       required: true
 *       description: The voucher code
 *     responses:
 *       200:
 *         description: Get voucher success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                    type: string
 *                    default: Thành công
 *                 voucher:
 *                    type: object
 *                    default: {}
 *       400:
 *         description: Get voucher by code fail
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                    type: string
 *                    default: Thất bại
 *                 message:
 *                    type: string
 *                    default: Lấy danh sách voucher thất bại
 *       500:
 *         description: Get voucher error
 */
router.get('/:code', voucherController.getVoucherByCode);
// Tạo voucher - admin
/**
 * @swagger
 * /api/voucher/:
 *   post:
 *     summary: Create new voucher
 *     tags: [Voucher]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                  type: string
 *                  default: codeptl123456
 *               discount:
 *                  type: string
 *                  default: 10
 *               amount:
 *                  type: string
 *                  default: 50
 *               expiredDate:
 *                  type: string
 *                  default: 2023-03-29
 *     responses:
 *       200:
 *         description: Create new voucher success
 *         content:
 *           application/json:
 *             schema:
 *             type: object
 *             properties:
 *               code:
 *                  type: string
 *                  default: codeptl123456
 *               discount:
 *                  type: string
 *                  default: 10
 *               amount:
 *                  type: string
 *                  default: 50
 *               expiredDate:
 *                  type: string
 *                  default: 2023-03-29 
 *       400:
 *         description: Create voucher fail
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                    type: string
 *                    default: Thất bại
 *                 message:
 *                    type: string
 *                    default: Thêm voucher thất bại!
 *       403:
 *         description: Not Authenticated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                    type: string
 *                    default: You are Authenticated
 *       500:
 *         description: Create the voucher error
 */
router.post(
	'/',
	isAuthenticated,
	isAdmin,
	voucherValidator,
	voucherController.createVoucher
);
// Cập nhật voucher - admin
/**
 * @swagger
 * /api/voucher/{id}:
 *   put:
 *     summary: Update new voucher
 *     parameters:
 *     - in: path
 *       name: id
 *       schema:
 *         type: string
 *       required: true
 *       description: The voucher id
 *     tags: [Voucher]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                  type: string
 *                  default: codeptl123456
 *               discount:
 *                  type: string
 *                  default: 10
 *               amount:
 *                  type: string
 *                  default: 50
 *               expiredDate:
 *                  type: string
 *                  default: 2023-03-29
 *     responses:
 *       200:
 *         description: Update voucher success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 voucher:
 *                   type: object
 *                   properties:
 *                     code:
 *                        type: string
 *                        default: codeptl123456
 *                     discount:
 *                        type: string
 *                        default: 10
 *                     amount:
 *                        type: string
 *                        default: 50
 *                     expiredDate:
 *                        type: string
 *                        default: 2023-03-29 
 *                 status:
 *                    type: string
 *                    default: Thành công
 *                 message:
 *                    type: string
 *                    default: Cập nhật voucher thành công!
 *       400:
 *         description: Update voucher fail
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                    type: string
 *                    default: Thất bại
 *                 message:
 *                    type: string
 *                    default: Cập nhật voucher thất bại!
 *       403:
 *         description: Not Authenticated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                    type: string
 *                    default: You are Authenticated
 *       500:
 *         description: Update the voucher error
 */
router.put(
	'/:id',
	isAuthenticated,
	isAdmin,
	updateVoucherValidator,
	voucherController.updateVoucher
);
// Xóa voucher - admin
/**
 * @swagger
 * /api/voucher/{id}:
 *   delete:
 *     summary: Delete voucher by id
 *     tags: [Voucher]
 *     parameters:
 *     - in: path
 *       name: id
 *       schema:
 *         type: string
 *       required: true
 *       description: The voucher id
 *     responses:
 *       200:
 *         description: Delete voucher by id success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                    type: string
 *                    default: Thành công
 *                 message:
 *                    type: string
 *                    default: Xoá voucher thành công!
 *       403:
 *         description: Not Authenticated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                    type: string
 *                    default: You are Authenticated
 *       400:
 *         description: Delete voucher by id fail
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                    type: string
 *                    default: Thất bại
 *                 message:
 *                    type: string
 *                    default: Không tìm thấy voucher
 *       500:
 *         description: Delete voucher by id fail
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                    type: string
 *                    default: Thất bại
 *                 message:
 *                    type: string
 *                    default: Xoá voucher thất bại
 */
router.delete('/:id', isAuthenticated, isAdmin, voucherController.deleteVoucher);
router.get('/use/:id', voucherController.useVoucher);

module.exports = router;
