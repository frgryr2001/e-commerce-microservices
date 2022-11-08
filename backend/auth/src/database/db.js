const mongoose = require('mongoose');
require('dotenv').config();

async function connect() {
	/* try {
		await mongoose.connect(process.env.DB_CONNECTION_STRING, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log('>>> Connect to mongodb successed');
	} catch (error) {
		console.log('>>> Connect mongodb failed', error);
	} */
	mongoose
	.connect(process.env.DB_CONNECTION_STRING,{
		useNewUrlParser: true,
		useUnifiedTopology: true
	 })
		.then(() => {
			console.log('Connect to mongodb successed');
		})
		.catch(err => {

			console.log('Connection failed', err);
		});
}

module.exports = connect;
