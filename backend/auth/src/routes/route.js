const express = require("express");
const userController = require("../controllers/userController");
const isAuthenticated = require("../middlewares/isAuthenticated");
const router = express.Router();
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
* /v1/api/auth/register:
*   post:
*     summary: Get user profile
*     tags: [Auth]
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
*               password:
*                 type: string
*                 description: Password of user
*                 default: 123456
*               email:
*                 type: string
*                 description: The email of user
*                 default: nhanle.lx@gmail.com
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
*         description: User was successfully created
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/User'
*       500:
*         description: Some server error
*/
router.post("/register", userController.register);

/**
 * @swagger
 * /v1/api/auth/login:
 *   post:
 *     summary: Login to system
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                  type: string
 *                  default: nhanle.lx@gmail.com
 *               password:
 *                  type: string
 *                  default: 123456
 *     responses:
 *       200:
 *         description: Login successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 */
router.post("/login", userController.login);

/**
* @swagger
* /v1/api/auth/refresh-token:
*   post:
*     summary: refresh new token
*     tags: [Auth]
*     responses:
*       200:
*         description: Login successfully
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/User'
*               type: object
*               properties:
*                 token:
*                    type: string
*                    default: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNzkyMTA2MTY1OGNmNGNjMjdjOWMwZSIsImZ1bGxuYW1lIjoiTGUgSG9hbmcgTmjDom4iLCJlbWFpbCI6Im5oYW5sZS5seEBnbWFpbC5jb20iLCJwaG9uZSI6IjAxMjM0NTY3ODkiLCJyb2xlIjoidXNlciIsImFkZHJlc3MiOiJRdeG6rW4gNyAsIEjhu5MgQ2jDrSBNaW5oIGNpdHkiLCJpYXQiOjE2Njg5NDAxNDEsImV4cCI6MTY2ODk0Mzc0MX0.JQB83vSYgNBgEKK44QnWvYVjipzG8ogEWv5U6hJiLeM
*       500:
*         description: Some server error
*/
router.post("/refresh-token", userController.refreshToken);

/**
* @swagger
* /v1/api/auth/forgotPassword:
*   post:
*     summary: Send request to reset password
*     tags: [Auth]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               email:
*                  type: string
*                  default: nhanle.lx@gmail.com
*     responses:
*       200:
*         description: Login successfully
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
*                    default: Gửi email thành công
*       500:
*         description: Some server error
*/
router.post("/forgotPassword", userController.forgotPassword);

/**
* @swagger
* /v1/api/auth/resetPassword/{token}:
*   patch:
*     summary: Send request to reset password
*     tags: [Auth]
*     parameters:
*       - in: path
*         name: token
*         schema:
*           type: string
*         required: true
*         description: The token reset password
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               password:
*                  type: string
*                  default: type your new password
*                  description: new password
*     responses:
*       200:
*         description: Reset password successfully
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
*                    default: Cập nhật mật khẩu mới thành công
*       500:
*         description: Some server error
*/
router.patch("/resetPassword/:token", userController.resetPassword);

/**
* @swagger
* /v1/api/auth/logout:
*   get:
*     summary: Logout
*     tags: [Auth]
*     responses:
*       200:
*         description: Logout successfully
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
*                    default: Đăng xuất thành công
*       401:
*         description: Invalid token
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 msg:
*                    type: string
*                    default: Token is not valid
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
router.get("/logout", isAuthenticated, userController.logout);

router.get("/test", isAuthenticated, (req, res) => {
	  res.send(req.user);
});
module.exports = router;
