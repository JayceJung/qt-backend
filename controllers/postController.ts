import { Request, Response } from 'express';
import User from '../models/user';
import Post from '../models/post';
import Comment from '../models/comment';

export async function postPost(req: Request, res: Response) {
    const { title, postContent } = req.body;
    try {
        // @ts-ignore
        const userId = req.session.userId;
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

export async function getAllPost(req: Request, res: Response) {
    try {
        const posts = await Post.find({}).exec();
        console.log(posts);
        return res.status(200).json({ posts: posts });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' })
    }
}

export async function getPost(req: Request, res: Response) {
    const { id } = req.params;
    console.log(req.params);
    try {
        const post = await Post.findById(id).exec();
        const comments = [];
        if (!post) {
            return res.status(500).json({ message: 'Internal server error' })
        }
        
        console.log(post.comments);
        
        const allComment = await Comment.find({ "_id": {"$in": post.comments }}).exec()
        
        for (const comment of allComment) {
            const user = await User.findById(comment.user).exec()
            if (!user) {
                return res.status(401).json({ message: 'User not found' })
            }
            comments.push({
                user: user?.username,
                comment: comment.comment
            })
        }

        const response = {
            post: {
                title: post.title,
                content: post.content
            },
            comments: comments,
            bibleVerse: post.bibleVerse
        }
        return res.status(200).json({ payload: response });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' })
    }
}

export async function updatePost(req: Request, res: Response) {

}

export async function deletePost(req: Request, res: Response) {

}

export async function postComment(req: Request, res: Response) {
    const { postId, comment } = req.body;
    try {
        // @ts-ignore
        const user = req.session.user;
        console.log(user);

        if (!user) {
            return res.status(400).json({ message: 'User not found'});
        }
        
        const post = await Post.findById(postId)

        if (!post) {
            return res.status(401).json({ message: 'Could not find post'});
        }
        const newComment = await Comment.create({ user, comment, post });

        // @ts-ignore
        post.comments.push(newComment);
        post.save();
        return res.status(201).json({ message: 'Post registered successfully', comment: newComment });
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal server error' });
    }

}
