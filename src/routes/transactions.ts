import * as express from 'express';
const router = express.Router();
import { getTransactions, addTransaction, deleteTransaction } from "./../controllers/transactionController";


router.route('/')
    .get(getTransactions)
    .post(addTransaction);

router.route('/:id')
    .delete(deleteTransaction);

export const transactionRoutes = router;