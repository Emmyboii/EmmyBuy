import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const connectDb = async () => {
    try {
        const connect = await mongoose.connect(process.env.CONNECTION_STRING);
        console.log(
            "Database Connected to:",
            connect.connection.host,
            connect.connection.name
        );
    } catch (error) {
        console.error(error);
        process.exit(1); // Exit process with failure
    }
};