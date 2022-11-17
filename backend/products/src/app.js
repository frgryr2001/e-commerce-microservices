const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const cors = require('cors');
const amqp = require('amqplib');
// dotenv
require('dotenv').config();
const PORT = process.env.PORT || 3002;

// connect to mongodb
const connect = require('./database/db');
// connectRabbitMQ();
//const connectRabbitMQ = require('./database/rabbitmq');

const productRouter = require('./api/routes/productRoute');
const categoryRouter = require('./api/routes/categoryRoute');
const voucherRouter = require('./api/routes/voucherRoute');

connect();

var connection, channel;

/* amqp.connect(process.env.RABBITMQ_AMQP_URL, function (error0, connection) {
	if (error0) {
		throw error0;
	}
	console.log('>>> Connect to rabbitmq successed');
	connection.createChannel(function (error1, channel) {
		if (error1) {
			throw error1;
		}
		channel.assertQueue('test', { durable: false });
	 */
const app = express();
app.set('trust proxy', 1);
app.use(
	cors({
		origin: ['http://localhost:3001', 'http://localhost:3006', 'http://localhost:3007'],
		credentials: true,
	})
);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
	session({
		secret: 'keyboard cat',
		resave: false,
		saveUninitialized: true,
		cookie: {
			maxAge: 365 * 24 * 60 * 60 * 1000,
			secure: false,
			sameSite: 'none',
		},
	})
);

app.use('/api/products', productRouter);
app.use('/api/category', categoryRouter);
app.use('/api/voucher', voucherRouter);

async function connectRabbitMQ() {
	// Note:- Need to connect rabbitMQ Server, to access the Channel
	try {
		const amqpServer = `${process.env.RABBITMQ_AMQP_URL}`;
		connection = await amqp.connect(amqpServer);
		channel = await connection.createChannel();
		await channel.assertQueue('tested', { durable: false });
		await channel.assertQueue('PRODUCT_CONFIRM_ORDER', { durable: false });
		console.log('>>> Connect to rabbitmq successed');
	} catch (err) {
		console.log(err);
	}
}

connectRabbitMQ().then(() => {
	channel.consume('test', async function (msg) {
		console.log(' 2.[product] Received %s', msg.content.toString());
		channel.sendToQueue('tested', Buffer.from('Ok nhận được'));
	});
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// 500 error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.status(500).json({ message: err });
});

app.listen(PORT, () => {
	console.log(`>>> App listening on port ${PORT}`);
});
/* 	});
}); */
