const express = require('express');
const {
    addExpense,
    getAllExpenses,
    deleteExpense,
    downloadExpenseExcel
} = require('../controllers/expenseController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

/**
 * @swagger
 * /api/v1/expense/add-expense:
 *   post:
 *     summary: Add a new expense entry
 *     tags:
 *       - Expense
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - category
 *               - amount
 *               - date
 *             properties:
 *               icon:
 *                 type: string
 *                 example: "🛒"
 *               category:
 *                 type: string
 *                 example: "Groceries"
 *               amount:
 *                 type: number
 *                 example: 4500
 *               date:
 *                 type: string
 *                 format: date
 *                 example: "2025-06-03"
 *     responses:
 *       201:
 *         description: Expense added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 userId:
 *                   type: string
 *                 icon:
 *                   type: string
 *                 category:
 *                   type: string
 *                 amount:
 *                   type: number
 *                 date:
 *                   type: string
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Error adding expense
 */
router.post('/add-expense', protect, addExpense);

router.get('/all-expenses', protect, getAllExpenses);

router.delete('/:id', protect, deleteExpense);

router.get('/downloadexcel', protect, downloadExpenseExcel);

module.exports = router;