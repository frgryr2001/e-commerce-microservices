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
			default: '',
		},
	},
	{
		timestamps: true,
	}
);
categorySchema.pre("save", async function (next) {

	this.slug = removeVietnameseTones(this.name) ;

	next();
 });
module.exports = mongoose.model('Category', categorySchema);
