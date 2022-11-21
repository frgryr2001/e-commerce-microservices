const isAuthenticated = require("../middlewares/isAuthenticated");
const express = require("express");
const router = express.Router();
const AdminController = require("../controllers/adminController");
const isAdmin = require("../middlewares/roleCheck");
/**
*@swagger
*components:
*   schemas:
*     User:
*       type: object
*       required:
*         -fullname
*         -password
*         -email
*         -role
*         -phone
*         -address
*       properties:
*         fullname:
*           type: string
*           description: The fullname of user
*         password:
*           type: string
*           description: Password of user
*         email:
*           type: string
*           description: The email of user
*         role:
*           type: string
*           description: The role of user
*         phone:
*           type: string
*           description: The role of user
*         address:
*           type: string
*           description: The role of user
*         active:
*           type: boolean
*           description: Active status of user
*         _id:
*           type: string
*           description: Active status of user
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
* /api/admin/delete-user/{id}:
*   delete:
*     summary: Delete user
*     tags: [Admin]
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         required: true
*         description: The id of user
*     responses:
*       200:
*         description: Delete user succesfully
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
*                    default: Xóa người dùng thành công       
*       400:
*         description: Delete fail
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
*                    default: Xóa người dùng không thành công
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
router.delete(
  "/delete-user/:id",
  isAuthenticated,
  isAdmin,
  AdminController.deleteUser
);
/**
* @swagger
* /api/admin/get-all-users:
*   get:
*     summary: Get all users
*     tags: [Admin]
*     responses:
*       200:
*         description: Get all users succesfully
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 data:
*                    type: object
*                    default: data object
*                 status:
*                    type: string
*                    default: success
*                 message:
*                    type: string
*                    default: Lấy danh sách thành công  
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
*       500:
*         description: Get all user error
*/
router.get(
  "/get-all-users",
  isAuthenticated,
  isAdmin,
  AdminController.getAllUsers
);
module.exports = router;
