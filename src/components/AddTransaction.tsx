import React, { useState, useContext } from 'react'
import { GlobalContext, transactionType } from '../context/GlobalState';
import { v4 as uuid } from 'uuid';

export const AddTransaction = () => {
    const [text, setText] = useState('');
    const [amount, setAmount] = useState(0);
    const { addTransaction } = useContext(GlobalContext);
    const onSubmit = (e: any) => {
        e.preventDefault();
        var newTransaction: transactionType = {
            id: uuid(),
            text,
            amount: +amount
        };
        console.log(newTransaction);
        addTransaction(newTransaction);
    }

    return (
        <>
            <h3>Add new transaction</h3>
            <form id="form" onSubmit={(e) => onSubmit(e)}>
                <div className="form-control">
                    <label htmlFor="text">Text</label>
                    <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter text..." />
                </div>
                <div className="form-control">
                    <label htmlFor="amount">Amount <br />
                        (negative - expense, positive - income)</label
                    >
                    <input type="number" value={amount} onChange={(e) => setAmount(parseInt(e.target.value))} placeholder="Enter amount..." />
                </div>
                <button className="btn">Add transaction</button>
            </form>
        </>
    )
}
