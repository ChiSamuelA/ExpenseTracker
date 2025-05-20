const express = require('express')

const {
    registerUser,
    loginUser,
    getUserInfo
} = require('../controllers/authController');

const router = express.Router();

/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: Register user
 *     tags:
 *       - Auth
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 */

router.post('/register', registerUser);

router.post('/login', loginUser);

// router.get('/getUser', protect, getUserInfo);

module.exports = router;