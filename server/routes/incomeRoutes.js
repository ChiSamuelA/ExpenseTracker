const express = require('express');
const {
    addIncome,
    getAllIncomes,
    deleteIncome,
    downloadIncomeExcel
} = require('../controllers/incomeController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

/**
 * @swagger
 * /api/v1/income/add-income:
 *   post:
 *     summary: Add a new income entry
 *     tags:
 *       - Income
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               amount:
 *                 type: number
 *               category:
 *                 type: string
 *               description:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Income added successfully
 *       400:
 *         description: Invalid input or missing fields
 *       401:
 *         description: Unauthorized
 */
router.post('/add-income', protect, addIncome);

/**
 * @swagger
 * /api/v1/income/all-incomes:
 *   get:
 *     summary: Get all income entries for the authenticated user
 *     tags:
 *       - Income
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of income entries retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 incomes:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       source:
 *                         type: string
 *                       amount:
 *                         type: number
 *                       date:
 *                         type: string
 *                         format: date-time
 *                       icon:
 *                         type: string
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *       401:
 *         description: Unauthorized – missing or invalid token
 */
router.get('/all-incomes', protect, getAllIncomes);


router.delete(':id', protect, deleteIncome);
router.get('/downloadexcel', protect, downloadIncomeExcel);

module.exports = router;
