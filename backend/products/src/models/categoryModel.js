const mongoose = require('mongoose');
const removeVietnameseTones = require ('../utils/removeVietnameseTones');
const Schema = mongoose.Schema;

const categorySchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		slug: {
			type: String,
			trim: true,
			default: removeVietnameseTones(this.name),
		},
	},
	{
		timestamps: true,
	}
);

const Category = mongoose.model('Category', categorySchema);
