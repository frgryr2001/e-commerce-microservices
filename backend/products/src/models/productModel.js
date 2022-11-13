const removeVietnameseTones = require('../utils/removeVietnameseTones');

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ProductOption = require('./product_optionModel');
const ProductImage = require('./productImageModel');
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
			type: [ProductImage.schema],
			default: [],
		},
		id_category: {
			type: String,
		},
		category: {
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
			default: removeVietnameseTones(this.name) + `-${Math.floor(Date.now() + Math.random())}`,
		},
		sale_off_price: {
			type: Number,
			default: this.price,
		},
		product_options: {
			type: [ProductOption.schema],
			default: [],
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Product', productSchema);