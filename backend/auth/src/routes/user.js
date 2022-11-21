const isAuthenticated = require('../middlewares/isAuthenticated');
const express = require('express');
const router = express.Router();
const { userValidator } = require('../utils/validator');

const userProfilesController = require('../controllers/userProfileController');
/**
*@swagger
*components:
*   schemas:
*     User:
*       type: object
*       example:
*           fullname :  Le Hoang Nhân  
*           password :  $2b$10$.sxXpaFRyh0g.MYa7I0Zme3n8/yR3N0lksLBInCL2geYId43ojUqu  
*           email :  nhan1le1.lx@gmail.com  
*           role :  user  
*           phone :  1234526789  
*           address :  Quận 7   Hồ Chí Minh city  
*           active : true 
*           _id :  6379ff13811c71ea8681c7e0  
*           createdAt :  2022-11-20T10:18:59.299Z  
*           updatedAt :  2022-11-20T10:18:59.299Z  
*           __v : 0          
*/

/**
* @swagger
* /api/user/update-profile:
*   post:
*     summary: Update profile of user
*     tags: [User]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               fullname:
*                  type: string
*                  description: The fullname of user
*                  default: Le Hoang Nhân
*               phone:
*                 type: string
*                 description: The phone of user
*                 default: 0123456789
*               address:
*                  type: string
*                  description: The address of user
*                  default: Quận 7 , Hồ Chí Minh city    
*     responses:
*       200:
*         description: Update profile successfully
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 status:
*                    type: string
*                    default: success
*                 message:
*                    type: string
*                    default: Cập nhật thông tin thành công
*       400:
*         description: Update  fail
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 status:
*                    type: string
*                    default: fail
*                 message:
*                    type: string
*                    default: Cập nhật thông tin người dùng không thành công
*       403:
*         description: Not Authenticated
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 msg:
*                    type: string
*                    default: You are Authenticated 
*/
router.post(
	'/update-profile',
	isAuthenticated,
	userValidator,
	userProfilesController.updateProfile
);
/**
* @swagger
* /api/user/get-profile:
*   get:
*     summary: Get profile of user
*     tags: [User]
*     responses:
*       200:
*         description: Get profile of user logged in 
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/User'
*       400:
*         description: Update  fail
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 status:
*                    type: string
*                    default: fail
*                 message:
*                    type: string
*                    default: Lấy thông tin người dùng không thành công
*       403:
*         description: Not Authenticated
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 msg:
*                    type: string
*                    default: You are Authenticated 
*/
router.get('/get-profile', isAuthenticated, userProfilesController.getProfile);

module.exports = router;
