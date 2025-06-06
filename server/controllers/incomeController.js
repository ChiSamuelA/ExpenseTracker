const xlsx = require('xlsx');
const Income = require('../models/Income');

// add income
exports.addIncome = async (req, res) => {
    const userId = req.user.id;

    try {
        const { icon, source, amount, date } = req.body;

        // Validation: check for missing fields
        if(!source || !amount || !date){
            return res.status(400).json({
                message: 'All fields are required'
            });
        }

        const newIncome = new Income({
            userId,
            icon,
            source,
            amount,
            date: new Date(date)
        });

        await newIncome.save();
        res.status(201).json(newIncome);
    } catch (error) {
        res.status(500).json({
            message: 'Error adding income',
            error: error.message
        });
    }
}

// get all incomes
exports.getAllIncomes = async (req, res) => {
    const userId = req.user.id;

    try {
        const income = await Income.find({ userId }).sort({ date: -1 });
        res.json(income);
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            error: error.message
        })
    }
}

// delete income
exports.deleteIncome = async (req, res) => {
    try {
        await Income.findByIdAndDelete(req.params.id);
        res.json({
            message: "Income Successfully Deleted"
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error Deleting Income',
            error: error.message
        })
    }
}

// download income excel
exports.downloadIncomeExcel = async (req, res) => {
    const userId = req.user.id;

    try {
        const income = await Income.find({ userId }).sort({ date: -1 });

        const data = income.map((item) => ({
            Source: item.source,
            Amount: item.amount,
            Date: item.date.toISOString().split('T')[0],
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Income");

        // Write workbook to buffer instead of disk
        const buffer = xlsx.write(wb, { type: 'buffer', bookType: 'xlsx' });

        // Set response headers
        res.setHeader('Content-Disposition', 'attachment; filename="income_details.xlsx"');
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

        // Send buffer directly
        return res.send(buffer);

    } catch (error) {
        res.status(500).json({
            message: 'Error Downloading Income Details',
            error: error.message
        });
    }
};