const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/userModel");
class userService {
  constructor(userModel) {
    this.userModel = userModel;
  }

  async register(user) {
    const { fullname, password, email, phone, address } = user;

    const userExists = await this.userModel.findOne({ email });
    if (userExists) {
      throw new Error("Email này đã tồn tại");
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
    const user = await this.userModel.findOne({ email }).select("+password");
    if (!user) {
      throw new Error("Email không tồn tại");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Sai mật khẩu");
    }
    user.password = undefined;
    return user;
  }
  async generateToken(user, secretKey, expires) {
    const token = jwt.sign({ id: user._id }, secretKey, { expiresIn: expires });
    return token;
  }
}
module.exports = new userService(User);
