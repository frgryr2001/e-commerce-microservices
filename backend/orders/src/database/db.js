const mongoose = require('mongoose');
require('dotenv').config();

async function connect() {
	try {
		await mongoose.connect(process.env.DB_CONNECTION_STRING, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		});
		console.log('>>> Connect to mongodb successed');
	} catch (error) {
		console.log('>>> Connect mongodb failed', error);
	}
}

module.exports = connect;
