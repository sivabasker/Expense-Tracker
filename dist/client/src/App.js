"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
require("./App.css");
const AddTransaction_1 = require("./components/AddTransaction");
const Balance_1 = require("./components/Balance");
const Header_1 = require("./components/Header");
const IncomeExpense_1 = require("./components/IncomeExpense");
const TransactionList_1 = require("./components/TransactionList");
const GlobalState_1 = require("./context/GlobalState");
function App() {
    return (<GlobalState_1.GlobalProvider>
      <Header_1.Header />
      <div className="container">
        <Balance_1.Balance />
        <IncomeExpense_1.IncomeExpense />
        <TransactionList_1.TransactionList />
        <AddTransaction_1.AddTransaction />
      </div>
    </GlobalState_1.GlobalProvider>);
}
exports.default = App;
