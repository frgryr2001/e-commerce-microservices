const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const productImageSchema = new Schema(
	{
		product_id: {
			type: String,
			required: true,
		},
		image_name: {
			type: String,
			required: true,
		},
		image_url: {
			type: String,
			required: true,
		},
		delete_url: {
			type: String,
			default: '',
		},
	}
);

module.exports = mongoose.model('ProductImage', productImageSchema);