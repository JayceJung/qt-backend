import express from 'express';
import { getUser, getUsers } from '../controllers/userController';

export const userRoutes = express.Router();

userRoutes.get('/', getUsers);
userRoutes.get('/:id', getUser);