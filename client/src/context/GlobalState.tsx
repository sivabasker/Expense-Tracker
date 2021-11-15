import React, { createContext, ReactNode, useReducer } from 'react';
import AppReducer from './AppReducer';
import axios from 'axios';

export type transactionType = {
    _id: string;
    text: string;
    amount: number;
};

const initialState: GlobalContextValue = {
    transactions: [],
    loading: true,
    error: "",
    getTranactions: () => { },
    addTransaction: () => { },
    deleteTransaction: () => { }
};

interface GlobalContextValue {
    transactions: transactionType[];
    loading: boolean;
    error: string;
    getTranactions: () => void;
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

    async function getTranactions() {
        try {
            const res = await axios.get('api/v1/transactions')
            dispatch({
                type: 'GET_TRANSACTIONS',
                payload: res.data.data
            });
        }
        catch (err: any) {
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: err.response.data.error
            })
        }
    }

    // dispatch 
    async function deleteTransaction(id: string) {
        try {
            await axios.delete(`api/v1/transactions/${id}`);
            return dispatch({
                type: 'DELETE_TRANSACTION',
                payload: id
            });
        }
        catch (err: any) {
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: err.response.data.error
            })
        }
    }

    async function addTransaction(transaction: transactionType) {
        var config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        try {
            const res = await axios.post('api/v1/transactions', transaction, config);
            return dispatch({
                type: 'ADD_TRANSACTION',
                payload: res.data.data
            });
        }
        catch (err: any) {
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: err.response.data.error
            })
        }
    }

    return (
        <GlobalContext.Provider value={{
            transactions: state.transactions,
            loading: state.loading,
            error: state.error,
            getTranactions,
            deleteTransaction,
            addTransaction
        }}>
            {children}
        </GlobalContext.Provider>
    )
}
