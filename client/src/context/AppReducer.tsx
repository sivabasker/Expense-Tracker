import { transactionType } from './GlobalState';

interface IState {
    transactions: transactionType[];
    loading: boolean;
    error: string;
}

export default (state: IState, action: { type: any; payload: any }) => {
    switch (action.type) {
        case 'GET_TRANSACTIONS':
            return {
                ...state,
                loading: false,
                error: "",
                transactions: action.payload
            };
        case 'ADD_TRANSACTION':
            return {
                ...state,
                transactions: [...state.transactions, action.payload]
            };
        case 'DELETE_TRANSACTION':
            return {
                ...state,
                transactions: state.transactions.filter(transaction => transaction._id !== action.payload)
            };
        default:
            return state;
    }
}