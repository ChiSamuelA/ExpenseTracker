const xlsx = require('xlsx');
const Expense = require('../models/Expense');

// add expense
exports.addExpense = async (req, res) => {
    const userId = req.user.id;

    try {
        const { icon, category, amount, date } = req.body;

        // Validation: check for missing fields
        if(!category || !amount || !date){
            return res.status(400).json({
                message: 'All fields are required'
            });
        }

        const newExpense = new Expense({
            userId,
            icon,
            category,
            amount,
            date: new Date(date)
        });

        await newExpense.save();
        res.status(201).json(newExpense);
    } catch (error) {
        res.status(500).json({
            message: 'Error adding expense',
            error: error.message
        });
    }
}

// get all expenses
exports.getAllExpenses = async (req, res) => {
    const userId = req.user.id;

    try {
        const expense = await Expense.find({ userId }).sort({ date: -1 });
        res.json(expense);
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            error: error.message
        })
    }
}

// // delete expense
exports.deleteExpense = async (req, res) => {
    try {
        await Expense.findByIdAndDelete(req.params.id);
        res.json({
            message: "Expense Successfully Deleted"
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error Deleting Expense',
            error: error.message
        })
    }
}

// // download expense excel
exports.downloadExpenseExcel = async (req, res) => {
    const userId = req.user.id;

    try {
        const expense = await Expense.find({ userId }).sort({ date: -1 });

        const data = expense.map((item) => ({
            Category: item.category,
            Amount: item.amount,
            Date: item.date.toISOString().split('T')[0],
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Expense");

        // Write workbook to buffer instead of disk
        const buffer = xlsx.write(wb, { type: 'buffer', bookType: 'xlsx' });

        // Set response headers
        res.setHeader('Content-Disposition', 'attachment; filename="expense_details.xlsx"');
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

        // Send buffer directly
        return res.send(buffer);

    } catch (error) {
        res.status(500).json({
            message: 'Error Downloading Expense Details',
            error: error.message
        });
    }
};