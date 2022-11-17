const express = require("express");
const userController = require("../controllers/userController");
const isAuthenticated = require("../middlewares/isAuthenticated");
const router = express.Router();

router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/refresh-token", userController.refreshToken);
router.post("/forgotPassword", userController.forgotPassword);
router.patch("/resetPassword/:token", userController.resetPassword);
router.get("/logout", isAuthenticated, userController.logout);

router.get("/test", isAuthenticated, (req, res) => {
	  res.send(req.user);
});
module.exports = router;
