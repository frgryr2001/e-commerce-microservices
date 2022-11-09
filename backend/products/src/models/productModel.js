import removeVietnameseTones from '../utils/removeVietnameseTones';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ProductOption = require('./product_optionModel');
const productSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		price: {
			type: Number,
			default: 0,
		},
		description: {
			type: String,
			default: '',
			required: true,
			trim: true,
			trim: true,
		},
		images: {
			type: Array,
			default: [],
		},
		id_category: {
			type: String,
		},
		manufacture: {
			type: String,
			trim: true,
			default: '',
		},
		slug: {
			type: String,
			trim: true,
			default: removeVietnameseTones(name) + `-${Math.floor(Date.now() + Math.random())}`,
		},
		sale_off_price: {
			type: Number,
			default: price,
		},
		product_option: {
			type: ProductOption,
			default: [],
		},
	},
	{
		timestamps: true,
	}
);

const Product = mongoose.model('Product', productSchema);
