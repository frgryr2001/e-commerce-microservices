const mongoose = require('mongoose');
import removeVietnameseTones from '../utils/removeVietnameseTones';
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
			default: removeVietnameseTones(name),
		},
	},
	{
		timestamps: true,
	}
);

const Category = mongoose.model('Category', categorySchema);
