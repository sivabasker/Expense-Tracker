"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactionRoutes = void 0;
const express = require("express");
const router = express.Router();
const transactionController_1 = require("./../controllers/transactionController");
router.route('/')
    .get(transactionController_1.getTransactions)
    .post(transactionController_1.addTransaction);
router.route('/:id')
    .delete(transactionController_1.deleteTransaction);
exports.transactionRoutes = router;
