const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const voucherSchema = new Schema(
	{
		code: {
			type: String,
			required: true,
			trim: true,
		},
		percent: {
			type: Number,
			default: 0,
			min: 0,
			max: 100,
		},
		amount: {
			type: BigInt,
			default: 1000000000000000000,
		},
		expired: {
			type: Date,
			required: true,
		},
	},
	{
		timestamps: true,
		createAt: true,
	}
);

module.exports = mongoose.model('Voucher', voucherSchema);
