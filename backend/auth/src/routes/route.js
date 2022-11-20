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
*         address:
*           type: string
*           description: The role of user
*       example:
*         fullname : Le Hoang Nhân
*         password: 123456
*         email : nhanle.lx@gmail.com
*         phone : 0123456789
*         address: Quận 7 , Hồ Chí Minh city          
*/
 /**
 * @swagger
 * /v1/api/auth/register:
 *   post:
 *     summary: Create a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The book was successfully created
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
 *     summary: Create a new user
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
 *               token: 
 *       500:
 *         description: Some server error
 */
router.post("/refresh-token", userController.refreshToken);

/**
 * @swagger
 * /v1/api/auth/forgotPassword:
 *   post:
 *     summary: Create a new user
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
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 */
router.post("/forgotPassword", userController.forgotPassword);

router.patch("/resetPassword/:token", userController.resetPassword);

router.get("/logout", isAuthenticated, userController.logout);

router.get("/test", isAuthenticated, (req, res) => {
	  res.send(req.user);
});
module.exports = router;
