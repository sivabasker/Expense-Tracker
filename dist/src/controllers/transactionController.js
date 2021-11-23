"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTransaction = exports.addTransaction = exports.getTransactions = void 0;
const Transactions_1 = require("./../models/Transactions");
const mongoose = require("mongoose");
const getTransactions = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var transactionModel = mongoose.model('Transaction', Transactions_1.TransactionModel);
        const transactions = yield transactionModel.find();
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
});
exports.getTransactions = getTransactions;
const addTransaction = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var transactionModel = mongoose.model('Transaction', Transactions_1.TransactionModel);
        const transactions = yield transactionModel.create(req.body);
        return res.status(201).json({
            success: true,
            data: transactions
        });
    }
    catch (err) {
        console.error(err);
        if (err.name === 'ValidationError') {
            const message = Object.values(err.errors).map((val) => val === null || val === void 0 ? void 0 : val.message);
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
});
exports.addTransaction = addTransaction;
const deleteTransaction = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        var transactionModel = mongoose.model('Transaction', Transactions_1.TransactionModel);
        const transactions = yield transactionModel.findById(id);
        console.log(transactions);
        if (!transactions) {
            return res.status(404).json({
                success: false,
                data: 'No data available'
            });
        }
        yield transactions.remove();
        return res.status(200).json({
            success: true,
            data: {}
        });
    }
    catch (err) {
        console.error(err);
        if (err.name === 'ValidationError') {
            const message = Object.values(err.errors).map((val) => val.message);
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
});
exports.deleteTransaction = deleteTransaction;
