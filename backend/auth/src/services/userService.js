const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
class userService {
	constructor(userModel) {
		this.userModel = userModel;
	}

	async register(user) {
		const { fullname, password, email, phone, address } = user;

		const userExists = await this.userModel.findOne({ email });
		if (userExists) {
			throw new Error('Email này đã tồn tại');
		}
		const salt = await bcrypt.genSalt(10);
		const hashPassword = await bcrypt.hash(password, salt);
		const newUser = await this.userModel.create({
			fullname,
			password: hashPassword,
			email,
			phone,
			address,
		});
		return newUser;
	}
	async login(email, password) {
		const user = await this.userModel.findOne({ email }).select('+password');
		if (!user) {
			throw new Error('Email không tồn tại');
		}
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			throw new Error('Sai mật khẩu');
		}
		user.password = undefined;
		return user;
	}
	async generateToken(user, secretKey, expires) {
		const token = jwt.sign({ id: user._id }, secretKey, { expiresIn: expires });
		return token;
	}
	async refreshToken(user) {
		const token = await this.generateToken(
			user,
			process.env.JWT_SECRET,
			process.env.JWT_EXPIRES
		);
		const refreshToken = await this.generateToken(
			user,
			process.env.JWT_REFRESH_KEY,
			process.env.JWT_REFRESH_EXPIRES
		);
		return { token, refreshToken };
	}

	async verifyToken(token, secretKey) {
		const decoded = await jwt.verify(token, secretKey);
		return decoded;
	}
}
module.exports = new userService(User);
