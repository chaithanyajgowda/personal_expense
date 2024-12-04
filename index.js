const express = require('express');
const bodyParser = require('body-parser');
const cron = require('node-cron');

const app = express();
const PORT = 6000;

// Middleware
app.use(bodyParser.json());

// In-memory data storage
let expenses = [];

// Predefined categories
const predefinedCategories = ['Food', 'Travel', 'Entertainment', 'Bills', 'Other'];

// Routes

// 1. Add Expense
app.post('/expenses', (req, res) => {
    const { category, amount, date } = req.body;

    // Validate input
    if (!predefinedCategories.includes(category)) {
        return res.status(400).json({ status: 'error', error: 'Invalid category.' });
    }
    if (amount <= 0 || typeof amount !== 'number') {
        return res.status(400).json({ status: 'error', error: 'Amount must be a positive number.' });
    }

    const newExpense = { id: expenses.length + 1, category, amount, date: new Date(date) };
    expenses.push(newExpense);

    return res.json({ status: 'success', data: newExpense });
});

// 2. Get Expenses
app.get('/expenses', (req, res) => {
    const { category, startDate, endDate } = req.query;
    let filteredExpenses = expenses;

    if (category) {
        filteredExpenses = filteredExpenses.filter(exp => exp.category === category);
    }
    if (startDate && endDate) {
        filteredExpenses = filteredExpenses.filter(exp => {
            const expDate = new Date(exp.date);
            return expDate >= new Date(startDate) && expDate <= new Date(endDate);
        });
    }

    return res.json({ status: 'success', data: filteredExpenses });
});

// 3. Analyze Spending
app.get('/expenses/analysis', (req, res) => {
    const analysis = {};

    // Total by category
    predefinedCategories.forEach(category => {
        const total = expenses
            .filter(exp => exp.category === category)
            .reduce((sum, exp) => sum + exp.amount, 0);
        if (total > 0) analysis[category] = total;
    });

    // Highest spending category
    const highestSpending = Object.keys(analysis).reduce((max, category) => {
        return analysis[category] > (analysis[max] || 0) ? category : max;
    }, '');

    return res.json({
        status: 'success',
        data: {
            totalByCategory: analysis,
            highestSpendingCategory: highestSpending,
        },
    });
});

// Automated Summary (CRON Job)
cron.schedule('*/1 * * * *', () => {
    const today = new Date();
    const thisMonth = today.getMonth();
    const thisYear = today.getFullYear();

    const monthlyData = expenses.filter(
        (exp) => new Date(exp.date).getMonth() === thisMonth && new Date(exp.date).getFullYear() === thisYear
    );

    const summary = {};
    monthlyData.forEach((expense) => {
        if (!summary[expense.category]) {
            summary[expense.category] = 0;
        }
        summary[expense.category] += expense.amount;
    });

    monthlySummary = {
        month: thisMonth + 1, // Month is 0-indexed
        year: thisYear,
        summary,
    };

    console.log('Monthly Expense Summary Updated:', monthlySummary);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
