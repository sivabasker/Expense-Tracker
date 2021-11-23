"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const morgan = require("morgan");
const path = require("path");
const configuration_1 = require("./src/config/configuration");
const dbConnect_1 = require("./src/util/dbConnect");
const transactions_1 = require("./src/routes/transactions");
(0, dbConnect_1.connectDB)();
const app = express();
app.use(express.json());
if (configuration_1.settings.ENV === 'development') {
    app.use(morgan('dev'));
}
app.use('/api/v1/transactions', transactions_1.transactionRoutes);
const clientPath = path.resolve(__dirname, '..', 'public');
app.use(express.static(clientPath));
app.get('*', (req, res) => res.sendFile(clientPath + 'index.html'));
const PORT = configuration_1.settings.PORT || 5000;
app.listen(PORT, () => console.log(`Backend listing on ${PORT}`));
