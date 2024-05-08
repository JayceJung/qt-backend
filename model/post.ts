import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
    {
        user: {
            required: true,
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
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

module.exports = mongoose.model('Post', postSchema)