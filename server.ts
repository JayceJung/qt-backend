import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
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

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, World!');
});

