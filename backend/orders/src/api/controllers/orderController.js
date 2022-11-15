const Order = require('../../models/orderModel');
const OrderDetail = require('../../models/orderDetailModel');
const { validationResult } = require('express-validator');

class OrderController {
	async getAllOrders(req, res) {
		try {
			const orders = await Order.find();
			res.status(200).json({ status: 'Thành công ', orders: orders });
		} catch (err) {
			console.error(err.message);
			res.status(400).json({
				status: 'Thất bại',
				message: 'Lấy danh sách đơn hàng thất bại!',
			});
		}
	}

	//
	async getOrderByEachUser(req, res) {
		try {
			const orders = await Order.find({ user_id: req.user._id });
			res.status(200).json({ status: 'Thành công ', orders: orders });
		} catch (err) {
			console.error(err.message);
			res.status(400).json({
				status: 'Thất bại',
				message: 'Lấy danh sách đơn hàng thất bại!',
			})
		}
	}

	async getOrderById(req, res) {
		try {
			const order = await Order.findById(req.params.id);
			if (!order) {
				return res.status(400).json({
					status: 'Thất bại',
					message: 'Không tìm thấy đơn hàng!',
				});
			}
			res.status(200).json({ status: 'Thành công', order: order });
		} catch (err) {
			console.error(err.message);
			res.status(400).json({
				status: 'Thất bại',
				message: 'Không tìm thấy đơn hàng!',
			});
		}
	}

	async createOrder(req, res) {
		const errors = await validationResult(req);
		if (!errors.isEmpty()) {
			return res
				.status(400)
				.json({ status: 'Thất bại', message: errors.array()[0].msg });
		} else {
			const { voucher_code, cart_detail, } = req.body;
			try {
				const order = new Order({
					order_date,
					order_status,
					user_id,
					total_price,
				});
				await order.save();
				res.status(200).json({
					status: 'Thành công',
					message: 'Tạo đơn hàng thành công!',
					order: order,
				});
			} catch (err) {
				console.error(err.message);
				res.status(400).json({
					status: 'Thất bại',
					message: 'Tạo đơn hàng thất bại!',
				});
			}

}

module.exports = new OrderController();
