const Order = require('../../models/orderModel');
const OrderDetail = require('../../models/orderDetailModel');
const { validationResult } = require('express-validator');
const amqp = require('amqplib');
const axios = require('axios');
const { closeOnErr, work } = require('../../database/rabbitmq');
/* var connection, channel;
(async () => {
	const amqpServer = `${process.env.RABBITMQ_AMQP_URL}`;
	connection = await amqp.connect(amqpServer);
	channel = await connection.createChannel();
	await channel.assertQueue('ORDER_UPDATE_PRODUCT', { durable: false });
	await channel.assertQueue('tested', { durable: false });
	
})(); */

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
			const { voucher_code, province_id, district_id, ward_id, address, cart_detail } =
				req.body;
			const products_price = cart_detail.reduce((total, product) => {
				return (total += product.price * item.quantity);
			}, 0);
			const quantity = cart_detail.reduce((total, product) => {
				return (total += product.quantity);
			}, 0);
			let voucher_price = 0;
			if (voucher_code) {
				data = await axios.get(
					`${process.env.VOUCHER_URL}/api/voucher/${voucher_code}`,
					{
						headers: {
							'context-type': 'application/json',
						},
					}
				);
				voucher_price = (products_price * (100 - data.voucher.discount)) / 100;
			}
			const total_price = products_price - voucher_price;
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

	async getShippingFee(req, res) {
		const errors = await validationResult(req);
		if (!errors.isEmpty()) {
			return res
				.status(400)
				.json({ status: 'Thất bại', message: errors.array()[0].msg });
		} else {
			const { province_id, district_id, ward_id, cart_detail, quantity } = req.body;
			let qty = 0;
			if (cart_detail) {
				qty = cart_detail.reduce((total, product) => {
					return (total += product.quantity);
				}, 0);
			}
			let shipping_fee = 0;
			try {
				let service_id = await axios
					.post(
						'https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/available-services',
						{
							from_district: 1449,
							to_district: district_id,
							shop_id: Number(process.env.SHOP_ID_GHN),
						},
						{
							headers: {
								'Content-Type': 'application/json',
								token: `${process.env.API_TOKEN_GHN}`,
							},
						}
					)
					.catch(function (error) {
						if (error.response) {
							console.log(error.response.data);
							console.log(error.response.status);
							console.log(error.response.headers);
						} else if (error.request) {
							console.log(error.request);
						} else {
							console.log('Error', error.message);
						}
						console.log(error.config);
					});
				let data = await axios
					.post(
						'https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee',
						{
							from_district_id: 1449,
							to_district_id: district_id,
							to_ward_code: ward_id,
							service_id: service_id.data.data[0].service_id,
							weight: 220 * quantity,
							length: 27,
							width: 20 ,
							height: 12 * quantity,
							insurance_value: 0,
						},
						{
							headers: {
								token: `${process.env.API_TOKEN_GHN}`,
								'Content-Type': 'application/json',
								shopid: process.env.SHOP_ID_GHN,
							},
						}
					).catch(function (error) {
						if (error.response) {
							console.log(error.response.data);
							console.log(error.response.status);
							console.log(error.response.headers);
						} else if (error.request) {
							console.log(error.request);
						} else {
							console.log('Error', error.message);
						}
						console.log(error.config);
					});
				await console.log(data.data.data.total);
				shipping_fee = data.data.data.total;
				return res.status(200).json({
					status: 'Thành công',
					message: 'Tính phí vận chuyển thành công!',
					shipping_fee: shipping_fee,
				});
			} catch (err) {
				console.error(err.message);
				return res.status(400).json({
					status: 'Thất bại',
					message: 'Có lỗi xảy ra khi tính phí vận chuyển, vui lòng thử lại!',
					err: err,
				});
			}
		}
	}

	async test(req, res) {
		/* 		await amqp.connect(
			`${process.env.RABBITMQ_AMQP_URL}`,
			function (error0, connection) {
				if (error0) {
					throw error0;
				}
				connection.createChannel(async function (error1, channel) {
					if (error1) {
						throw error1;
					} */

		const amqpServer = `${process.env.RABBITMQ_AMQP_URL}`;
		const connection = await amqp.connect(amqpServer);
		const channel = await connection.createChannel();
		var queue = 'test';
		var msg = 'Hello world';

		await channel.sendToQueue(queue, Buffer.from(msg));
		await console.log(' 1.[order] Sent %s', msg);
		/* await channel.consume('tested', async function (msg) {
			await console.log(' 3.[order] Received %s', msg.content.toString());
			if (!msg.content) {
				console.log('Không có tin nhắn');
			}
		}); */
		await channel.assertQueue('tested', { durable: false });
		await channel.consume('tested', async function (msg) {
			await console.log(' 3.[order] Received %s', msg.content.toString());
			if (!msg.content) {
				console.log('Không có tin nhắn');
			}
		});

		/* 	channel.consume(
		'tested',
		msg => {
			console.log(' 3.[order] Received %s', msg.content.toString());
		},
		{ noAck: false }
	); */
		console.log('[order]');
		/* 		await channel.consume('tested', (msg) =>{
			console.log(' 3.[order] Received %s', msg.content.toString());
			if (!msg.content) {
				console.log('Không có tin nhắn');
			}
		},{ noAck: false }); */
		/* 				});
			}
		);	 */
		await channel.close();
		await connection.close();
		console.log(' end[ok]');
		return res.status(200).json({
			status: 'Thành công',
			message: 'Đặt hàng thành công đơn hàng của bạn đang được xử lý!',
		});
	}
}

module.exports = new OrderController();
