import React, { createContext, ReactNode, useReducer } from 'react';
import AppReducer from './AppReducer';
import { v4 as uuid } from 'uuid';

export type transactionType = {
    id: string;
    text: string;
    amount: number
};

const initialState: GlobalContextValue = {
    transactions: [
        // { id: uuid(), text: 'Flower', amount: -20 },
        // { id: uuid(), text: 'Salary', amount: 300 },
        // { id: uuid(), text: 'Book', amount: -10 },
        // { id: uuid(), text: 'Camera', amount: 150 }
    ],
    addTransaction: () => { },
    deleteTransaction: () => { }
};

interface GlobalContextValue {
    transactions: transactionType[],
    deleteTransaction: (id: string) => void;
    addTransaction: (transaction: transactionType) => void;
}
// create context
export const GlobalContext = createContext<GlobalContextValue>(initialState);

interface GlobalProviderProps {
    children: ReactNode[]
}
// provide components

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    // dispatch 
    function deleteTransaction(id: string) {
        return dispatch({
            type: 'DELETE_TRANSACTION',
            payload: id
        });
    }

    function addTransaction(transaction: transactionType) {
        return dispatch({
            type: 'ADD_TRANSACTION',
            payload: transaction
        });
    }

    return (
        <GlobalContext.Provider value={{
            transactions: state.transactions,
            deleteTransaction,
            addTransaction
        }}>
            {children}
        </GlobalContext.Provider>
    )
}
