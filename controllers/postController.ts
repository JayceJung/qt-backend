import { Request, Response } from 'express';
import User from '../models/user';
import Post from '../models/post';

export async function postPost(req: Request, res: Response) {
    const { title, postContent } = req.body;
    try {
        // @ts-ignore
        const userId = req.session.userId;
        console.log(userId);
        const user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({ message: 'User not found'});
        }

        const newPost = await Post.create({ user, title, content: postContent });
        return res.status(201).json({ message: 'Post registered successfully', post: newPost });
    }
    catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export async function getPost(req: Request, res: Response) {

}

export async function updatePost(req: Request, res: Response) {

}

export async function deletePost(req: Request, res: Response) {

}
