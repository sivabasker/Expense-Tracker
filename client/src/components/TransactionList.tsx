import React, { useContext, useEffect } from 'react'
import { GlobalContext } from '../context/GlobalState'
import { Transaction } from './Transaction';
export const TransactionList = () => {

    const { transactions, getTranactions } = useContext(GlobalContext);

    useEffect(() => {
        getTranactions();
    }, []);

    return (<>
        <h3>History</h3>
        <ul className="list">
            {
                transactions.map(transaction => <Transaction key={transaction._id} transaction={transaction} />)
            }

        </ul>
    </>
    )
}
