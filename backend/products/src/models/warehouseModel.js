
const mongoose = require('mongoose');	
const Schema = mongoose.Schema;

const warehouseSchema = new Schema(
	{
		id_product: {
			type: String,
			required: true,
			trim: true,
		},
		id_user: {
			type: String,
			required: true,
			trim: true,
		},
		id_product_option: {
			type: String,
			required: true,
			trim: true,
		},
		quantity: {	
			type: Number,
			default: 0,
		},
		price : {
			type: Number,
			default: 0,
		}
	},
	{
		timestamps: true,
		createAt: true,
	}
);
