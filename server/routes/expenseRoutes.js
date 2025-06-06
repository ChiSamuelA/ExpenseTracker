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

/**
 * @swagger
 * /api/v1/expenses/all-expenses:
 *   get:
 *     summary: Get all expenses for the authenticated user
 *     tags:
 *       - Expenses
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of expense records
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   userId:
 *                     type: string
 *                   icon:
 *                     type: string
 *                   category:
 *                     type: string
 *                   amount:
 *                     type: number
 *                   date:
 *                     type: string
 *                     format: date
 *       401:
 *         description: Unauthorized - token missing or invalid
 *       500:
 *         description: Server error
 */
router.get('/all-expenses', protect, getAllExpenses);

/**
 * @swagger
 * /api/v1/expenses/{id}:
 *   delete:
 *     summary: Delete a specific expense by ID
 *     tags:
 *       - Expenses
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the expense to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Expense successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       401:
 *         description: Unauthorized - token missing or invalid
 *       500:
 *         description: Error deleting expense
 */

router.delete('/:id', protect, deleteExpense);

/**
 * @swagger
 * /api/v1/expenses/downloadexcel:
 *   get:
 *     summary: Download user's expenses as an Excel file
 *     tags:
 *       - Expenses
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Excel file containing expense data
 *         content:
 *           application/vnd.openxmlformats-officedocument.spreadsheetml.sheet:
 *             schema:
 *               type: string
 *               format: binary
 *       401:
 *         description: Unauthorized - token missing or invalid
 *       500:
 *         description: Error generating or downloading the Excel file
 */

router.get('/downloadexcel', protect, downloadExpenseExcel);

module.exports = router;