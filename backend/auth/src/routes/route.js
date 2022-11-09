const express = require("express");
const userController = require("../controllers/userController");
const isAuthenticated = require("../middlewares/isAuthenticated");
const router = express.Router();

router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/refresh-token", userController.refreshToken);
router.get("/logout", isAuthenticated, userController.logout);
module.exports = router;
