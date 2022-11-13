const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productOptionSchema = new Schema(
	{
		product_id: {
			type: String,
			required: true,
			trim: true,
		},
		size: {
			type: String,
			required: true,
			trim: true,
		},
		quantity: {
			type: Number,
			default: 0,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('ProductOption', productOptionSchema);