import express from 'express';
import { postPost, getAllPost, updatePost, deletePost, postComment } from '../controllers/postController';

export const postRoutes = express.Router();

postRoutes.post('/', postPost);
postRoutes.post('/comment', postComment);
postRoutes.get('/', getAllPost);
postRoutes.put('/', updatePost);
postRoutes.delete('/', deletePost);
