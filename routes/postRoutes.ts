import express from 'express';
import { postPost, getPost, updatePost, deletePost } from '../controllers/postController';

export const postRoutes = express.Router();

postRoutes.post('/', postPost);
postRoutes.get('/:id', getPost);
postRoutes.put('/', updatePost);
postRoutes.delete('/', deletePost);