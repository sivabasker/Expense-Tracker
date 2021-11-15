const express = require('express');
const config = require('./config');
const morgan = require('morgan');
const connectDB = require('./config/db');
const path = require('path');
const transactions = require('./routes/transactions');

connectDB();

const app = express();

app.use(express.json());

if (config.ENV === 'development') {
    app.use(morgan('dev'));
}

app.use('/api/v1/transactions', transactions);

app.use(express.static('public'));
app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'public', 'index.html')));

const PORT = config.PORT || 5000;
app.listen(PORT, console.log(`Backend listing on ${PORT}`));