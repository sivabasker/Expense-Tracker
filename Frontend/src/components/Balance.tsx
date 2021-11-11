import React, { useContext } from 'react'
import { GlobalContext } from '../context/GlobalState'
export const Balance = () => {
    const { transactions } = useContext(GlobalContext);
    let balance = transactions.map(trans => trans.amount).reduce((acc, item) => (acc += item), 0).toFixed(2);
    return (
        <>
            <h4>  Your Balance </h4>
            <h1 >${balance}</h1>
        </>
    )
}
