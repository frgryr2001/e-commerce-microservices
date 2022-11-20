const isAuthenticated = require('../middlewares/isAuthenticated');
const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/adminController');
const isAdmin = require('../middlewares/roleCheck');

router.delete('/delete-user/:id', isAuthenticated, isAdmin, AdminController.deleteUser);

module.exports = router;
