const Order = require('../../models/orderModel');
const OrderDetail = require('../../models/orderDetailModel');
const { validationResult } = require('express-validator');
const amqp = require('amqplib/callback_api');
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
			});
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
			const { voucher_code, cart_detail } = req.body;
			try {
				const order = new Order({
					voucher_code,
					user_id: req.user._id,
					total_price,
				});
				await order.save();
				res.status(200).json({
					status: 'Thành công',
					message: 'Đặt hàng thành công đơn hàng của bạn đang được xử lý!',
					order: order,
				});
			} catch (err) {
				console.error(err.message);
				res.status(400).json({
					status: 'Thất bại',
					message: 'Có lỗi xảy ra khi đặt hàng, vui lòng thử lại!',
				});
			}
		}
	}

	async test(req, res) {
		amqp.connect('amqp://localhost', function (error0, connection) {
			if (error0) {
				throw error0;
			}
			connection.createChannel(function (error1, channel) {
				if (error1) {
					throw error1;
				}
				var queue = 'hello';
				var msg = 'Hello world';
				channel.assertQueue(queue, {
					durable: false,
				});
				channel.sendToQueue('test', Buffer.from(msg));
				console.log(' [x] Sent %s', msg);
			});
		});
		console.log('ok');
		res.status(200).json({
			status: 'Thành công',
			message: 'Đặt hàng thành công đơn hàng của bạn đang được xử lý!',
		});
	}
}

module.exports = new OrderController();
