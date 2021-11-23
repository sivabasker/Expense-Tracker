import { Schema } from 'mongoose';

interface Transaction {
    text: string;
    amount: number;
};

export const TransactionModel = new Schema<Transaction>({
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
