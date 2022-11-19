const isAuthenticated = require('../middlewares/isAuthenticated');
const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/adminController');
const isAdmin = require('../middlewares/roleCheck');
//Xóa user bằng id - admin
router.delete('/delete-user/:id', isAuthenticated, isAdmin, AdminController.deleteUser);

module.exports = router;
