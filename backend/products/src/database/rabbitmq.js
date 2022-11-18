require('dotenv').config();
/* const amqp = require('amqplib');

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


module.exports = connectRabbitMQ;  */

var amqp = require('amqplib/callback_api');

// if the connection is closed or fails to be established at all, we will reconnect
var amqpConn = null;
function start() {
	amqp.connect('amqp://localhost:5672' + '?heartbeat=60', function (err, conn) {
		if (err) {
			console.error('[AMQP]', err.message);
			return setTimeout(start, 1000);
		}
		conn.on('error', function (err) {
			if (err.message !== 'Connection closing') {
				console.error('[AMQP] conn error', err.message);
			}
		});
		conn.on('close', function () {
			console.error('[AMQP] reconnecting');
			return setTimeout(start, 1000);
		});
		console.log('[AMQP] connected');
		amqpConn = conn;
		whenConnected();
	});
}

function whenConnected() {
	//startPublisher();
	startWorker();
}

var pubChannel = null;
var offlinePubQueue = [];
function startPublisher() {
	amqpConn.createConfirmChannel(function (err, ch) {
		if (closeOnErr(err)) return;
		ch.on('error', function (err) {
			console.error('[AMQP] channel error', err.message);
		});
		ch.on('close', function () {
			console.log('[AMQP] channel closed');
		});

		pubChannel = ch;
		while (true) {
			var m = offlinePubQueue.shift();
			if (!m) break;
			publish(m[0], m[1], m[2]);
		}
	});
}

function publish(exchange, routingKey, content) {
	try {
		pubChannel.publish(
			exchange,
			routingKey,
			content,
			{ persistent: true },
			function (err, ok) {
				if (err) {
					console.error('[AMQP] publish', err);
					offlinePubQueue.push([exchange, routingKey, content]);
					pubChannel.connection.close();
				}
			}
		);
	} catch (e) {
		console.error('[AMQP] publish', e.message);
		offlinePubQueue.push([exchange, routingKey, content]);
	}
}
// A worker that acks messages only if processed succesfully
function startWorker() {
	amqpConn.createChannel(function (err, ch) {
		if (closeOnErr(err)) return;
		ch.on('error', function (err) {
			console.error('[AMQP] channel error', err.message);
		});

		ch.on('close', function () {
			console.log('[AMQP] channel closed');
		});

		ch.prefetch(10);
		ch.assertQueue('test', { durable: false }, async function (err, _ok) {
			if (closeOnErr(err)) return;
			await ch.consume('test', (msg) => {
				work(msg, function (ok) {
					try {
						if (ok) ch.ack(msg);
						else ch.reject(msg, true);
					} catch (e) {
						closeOnErr(e);
					}
				});
				console.log("send")
				ch.sendToQueue('tested', Buffer.from('Ok nhận được'));
			}, { noAck: false });
			console.log('[product]');
			
		});
		ch.assertQueue('tested', { durable: false }, async function (err, _ok) {
			if (closeOnErr(err)) return;
			await ch.consume('tested', (msg) => {
				work(msg, function (ok) {
					try {
						if (ok) ch.ack(msg);
						else ch.reject(msg, true);
					} catch (e) {
						closeOnErr(e);
					}
				});
			}, { noAck: false });
			
		});
		function processMsg(msg) {
			work(msg, function (ok) {
				try {
					if (ok) ch.ack(msg);
					else ch.reject(msg, true);
				} catch (e) {
					closeOnErr(e);
				}
			});
		}
	});
}

function work(msg, cb) {
	console.log('Got msg ', msg.content.toString());
	cb(true);
}

function closeOnErr(err) {
	if (!err) return false;
	console.error('[AMQP] error', err);
	amqpConn.close();
	return true;
}

/* setInterval(function () {
	publish('', 'jobs', new Buffer.from('work work work'));
}, 1000); */

module.exports = start;
