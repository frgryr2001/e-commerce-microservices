const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const voucherSchema = new Schema(
	{
		code: {
			type: String,
			required: true,
			trim: true,
		},
		discount : {
			type: Number,
			default: 1,
			min: 1,
			max: 100,
		},
		amount: {
			type: Number,
			default: 100000000,
			min: 1,
		},
		expiredDate: {
			type: Date,
			required: true,
		},
	},
	{
		timestamps: true,
		createAt: true,
	}
);

//.replace(/\s+/, "") 
voucherSchema.pre("save", async function (next) {

	this.code = this.code.replace(/ /g, '').toLowerCase() ; ;

	next();
 });
module.exports = mongoose.model('Voucher', voucherSchema);
