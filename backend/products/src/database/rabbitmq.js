require('dotenv').config();
const amqp = require('amqplib');

const RABBITMQ_AMQP_URL = process.env.RABBITMQ_AMQP_URL;
async function connectRabbitMQ() {
	// Note:- Need to connect rabbitMQ Server, to access the Channel
	try {
		const amqpServer = `${RABBITMQ_AMQP_URL}`;
		connection = await amqp.connect(amqpServer);
		channel = await connection.createChannel();
		await channel.assertQueue('test', { durable: false });
		console.log('>>> Connect to rabbitmq successed');
	} catch (error) {
		console.log('>>> Connect rabbitmq failed', error);
	}
}


module.exports = connectRabbitMQ; 