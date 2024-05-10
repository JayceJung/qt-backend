import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { setupRoutes } from './routes';
import User from './models/user';

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 8080;
const mongoString = process.env.DATABASE_URL;

if (mongoString){
    mongoose.connect(mongoString);
}
const database = mongoose.connection

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
    
})

setupRoutes(app);