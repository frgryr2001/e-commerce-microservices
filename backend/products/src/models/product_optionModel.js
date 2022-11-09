const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productOptionSchema = new Schema(
	{
		id_product: {
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

const ProductOption = mongoose.model('ProductOption', productOptionSchema);