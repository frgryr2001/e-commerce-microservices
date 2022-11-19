const isAuthenticated = require('../middlewares/isAuthenticated');
const express = require('express');
const router = express.Router();
const { userValidator } = require('../utils/validator');

const userProfilesController = require('../controllers/userProfileController');
//Cập nhập thông tin cá nhân của mình - user
router.post(
	'/update-profile',
	isAuthenticated,
	userValidator,
	userProfilesController.updateProfile
);
// lấy thông tin cá nhân - user
router.get('/get-profile', isAuthenticated, userProfilesController.getProfile);

module.exports = router;
