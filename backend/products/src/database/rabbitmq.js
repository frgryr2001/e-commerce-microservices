require('dotenv').config();
const amqp = require('amqplib');

const RABBITMQ_AMQP_PORT = process.env.RABBITMQ_AMQP_PORT || 5672;
async function connectRabbitMQ() {
	// Note:- Need to connect rabbitMQ Server, to access the Channel
	try {
		const amqpServer = `amqp://localhost:${RABBITMQ_AMQP_PORT}`;
		connection = await amqp.connect(amqpServer);
		channel = await connection.createChannel();
		await channel.assertQueue('PRODUCT');
		console.log('>>> Connect to rabbitmq successed');
	} catch (error) {
		console.log('>>> Connect rabbitmq failed', error);
	}
}


module.exports = connectRabbitMQ; 