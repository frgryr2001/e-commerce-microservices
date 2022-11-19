const isAuthenticated = require('../middlewares/isAuthenticated');
const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/adminController');

router.delete('/delete-user/:id', isAuthenticated, AdminController.deleteUser);

module.exports = router;




