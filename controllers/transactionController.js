const Transaction = require('../models/Transactions')

exports.getTransactions = async (req, res, next) => {
    try {
        const transactions = await Transaction.find();
        return res.status(200).json({
            success: true,
            count: transactions.length,
            data: transactions
        });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
}

exports.addTransaction = async (req, res, next) => {
    try {
        const transactions = await Transaction.create(req.body);
        return res.status(201).json({
            success: true,
            data: transactions
        });
    }
    catch (err) {
        console.error(err);
        if (err.name === 'ValidationError') {
            const message = Object.values(err.errors).map(val => val.message);
            return res.status(400).json({
                success: false,
                data: message
            });
        }
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
}

exports.deleteTransaction = async (req, res, next) => {
    try {
        const { id } = req.params;
        console.log(id);
        const transactions = await Transaction.findById(id);
        console.log(transactions);
        if (!transactions) {
            return res.status(404).json({
                success: false,
                data: 'No data available'
            })
        }
        await transactions.remove();
        return res.status(200).json({
            success: true,
            data: {}
        });
    }
    catch (err) {
        console.error(err);
        if (err.name === 'ValidationError') {
            const message = Object.values(err.errors).map(val => val.message);
            return res.status(400).json({
                success: false,
                data: message
            });
        }
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
}