"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionModel = void 0;
const mongoose_1 = require("mongoose");
;
exports.TransactionModel = new mongoose_1.Schema({
    text: {
        type: String,
        trim: true,
        required: [true, 'Please add some Text']
    },
    amount: {
        type: Number,
        required: [true, 'Please add positive or Negative number']
    }
}, { timestamps: { createdAt: 'created', updatedAt: 'updated' } });
