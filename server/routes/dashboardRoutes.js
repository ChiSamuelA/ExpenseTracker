const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { getDashboardData } = require('../controllers/dashboardController');

const router = express.Router();

/**
 * @swagger
 * /api/v1/dashboard:
 *   get:
 *     summary: Get dashboard summary for the authenticated user
 *     tags:
 *       - Dashboard
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns total balance, income, expense and recent transactions
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalBalance:
 *                   type: number
 *                   example: 1200
 *                 totalIncome:
 *                   type: number
 *                   example: 3000
 *                 totalExpense:
 *                   type: number
 *                   example: 1800
 *                 last30DaysExpenses:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: number
 *                     transactions:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Expense'
 *                 last30DaysIncome:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: number
 *                     transactions:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Income'
 *                 recentTransactions:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       source:
 *                         type: string
 *                       category:
 *                         type: string
 *                       amount:
 *                         type: number
 *                       date:
 *                         type: string
 *                         format: date
 *                       type:
 *                         type: string
 *                         enum: [income, expense]
 *       401:
 *         description: Unauthorized - token missing or invalid
 *       500:
 *         description: Internal server error
 */

router.get('/', protect, getDashboardData);

module.exports = router;
