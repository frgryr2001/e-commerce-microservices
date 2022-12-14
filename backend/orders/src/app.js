const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const cors = require('cors');
const amqp = require('amqplib');
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const JWT = require("jsonwebtoken");
// dotenv
require('dotenv').config();
const PORT = process.env.PORT || 3001;
// connect to mongodb
const connect = require('./database/db');
//const connectRabbitMQ = require('./database/rabbitmq');

const orderRouter = require('./api/routes/orderRoute');
//swagger setting
const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "ORDER API DOCS",
			version: "1.0.0",
			description: "Order API on Swagger",
		},
    components:{
      securitySchemes:{
        bearerAuth:{
          type:"http",
          scheme:"bearer",
          bearerFormat: JWT,
          in: "header"
        }
      }
    },
    security:[{
      bearerAuth:[]
    }],
		servers: [
			{
				url: "http://localhost:3001",
			},
		],
	},
	apis: [__dirname.replaceAll("\\","/") + "/api/routes/orderRoute.js"],
};
const specs = swaggerJsDoc(options);
const app = express();
connect();
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
app.set('trust proxy', 1);
app.use(
	cors({
		origin: ['http://localhost:3002', 'http://localhost:3007', 'http://localhost:3006'],
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

/* (async function connectRabbitMQ() {
	// Note:- Need to connect rabbitMQ Server, to access the Channel
	try {
		const amqpServer = `${process.env.RABBITMQ_AMQP_URL}`;
		connection = await amqp.connect(amqpServer);
		channel = await connection.createChannel();

		await channel.assertQueue('tested', { durable: false });
		console.log('>>> Connect to rabbitmq successed');
	} catch (err) {
		console.log(err);
	}
})(); */
app.use('/api/orders', orderRouter);

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
