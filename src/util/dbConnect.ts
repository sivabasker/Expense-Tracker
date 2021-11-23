import * as mongoose from 'mongoose';
import { settings } from "./../config/configuration";

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(settings.MONGODB_URI);
        console.log(`Mongo DB connected ${conn.connection.host}`);
    }
    catch (err) {
        console.error(err);
        process.exit(1);
    }
};