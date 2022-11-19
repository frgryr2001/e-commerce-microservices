const isAuthenticated = require('../middlewares/isAuthenticated');
const express = require('express');
const router = express.Router();
const { userValidator } = require('../utils/validator');

const userProfilesController = require("../controllers/userProfileController");
router.post(
	'/update-profile',
	isAuthenticated,
	userValidator,
	userProfilesController.updateProfile
);
router.get('/get-profile', isAuthenticated, userProfilesController.getProfile);

module.exports = router;
