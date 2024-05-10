import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
    {
        user: {
            required: true,
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        title: {
            required: true,
            type: String
        },
        content: {
            required: true,
            type: String
        },
        comments: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Comment'
            }
        ]
    },
    {
        timestamps: true
    }
)

export default mongoose.model('Post', postSchema)