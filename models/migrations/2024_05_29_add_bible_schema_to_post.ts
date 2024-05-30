import mongoose from 'mongoose';
import Post from '../post'; // Update the path accordingly

// Define the allowed book values
const Books = [
    'ge', 'exo'
];

// Sample data for bibleVerse field
const sampleBibleVerse = {
    language: Books[0], // 'ge' as a sample language
    startChapter: 1,
    endChapter: 1,
    startVerse: 1,
    endVerse: 2
};

const dotenv = require('dotenv');
dotenv.config();

const mongoString = process.env.DATABASE_URL;
if (mongoString) {
    mongoose.connect(mongoString)
        .then(() => {
            console.log('Database connected');
            return migrateData();
        })
        .then(() => {
            console.log('Migration complete');
            mongoose.disconnect();
        })
        .catch(err => {
            console.error('Database connection error:', err);
            mongoose.disconnect();
        });
}

const migrateData = async () => {
    try {
        // Update all posts to include the bibleVerse field with sample data
        await Post.updateMany({}, {
            $set: {
                bibleVerse: sampleBibleVerse
            }
        });
    } catch (error) {
        console.error('Error during migration:', error);
        throw error; // Re-throw to ensure the disconnection happens
    }
};