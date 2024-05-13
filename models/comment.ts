import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
    {
        user: {
            required: true,
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        comment: {
            type: String,
            required: true
        },
        post: {
            required: true,
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post'
        }
    },
    {
        timestamps: true
    }
)

export default mongoose.model('Comment', commentSchema)