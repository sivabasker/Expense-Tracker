import * as  express from 'express';
import * as morgan from 'morgan';
import * as path from 'path';

import { settings } from "./src/config/configuration";
import { connectDB } from "./src/util/dbConnect";
import { transactionRoutes } from "./src/routes/transactions";

connectDB();

const app = express();

app.use(express.json());

if (settings.ENV === 'development') {
    app.use(morgan('dev'));
}

app.use('/api/v1/transactions', transactionRoutes);

const clientPath = path.resolve(__dirname, '..', 'public');

app.use(express.static(clientPath));
app.get('*', (req, res) => res.sendFile(clientPath + 'index.html'));

const PORT = settings.PORT || 5000;
app.listen(PORT, (): void => console.log(`Backend listing on ${PORT}`));