const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const User = require("../model/userModel");

async function isAuthenticated(req, res, next) {
  const token = req.headers.authorization;
  if (!token)
    return res.status(403).json({ msg: "You are not authenticated " });
  const accessToken = token.split(" ")[1];
  try {
    const decoded = await promisify(jwt.verify)(
      accessToken,
      process.env.JWT_SECRET
    );
    if (!decoded) {
      return res.status(401).json({ msg: "Invalid token" });
    }
    const user = await User.findById(decoded.id);

    req.user = user;

    next();
  } catch (err) {
    return res.status(401).json({ msg: "Token is not valid" });
  }
}
module.exports = isAuthenticated;
