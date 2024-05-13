import express from 'express';
import session from 'express-session';
import cors from 'cors';

import { authRoutes } from './authRoutes';
import { userRoutes } from './userRoutes';
import { postRoutes } from './postRoutes';

export function setupRoutes(app: express.Express) {
    const crypto = require('crypto');

    // Generate a random string of 32 bytes
    const generateSecretKey = () => {
        return crypto.randomBytes(32).toString('hex');
    };

    const secretKey = generateSecretKey();
    app.use(cors());
    app.use(session({
        secret: secretKey,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 // Session expires after 1 hour (in milliseconds)
        }
    }));

    app.use('/', authRoutes);
    app.use('/users', userRoutes);
    app.use('/posts', postRoutes);
    // Add more routes as needed
}