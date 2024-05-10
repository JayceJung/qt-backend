import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username: {
            required: true,
            type: String,
            unique: true
        },
        email: {
            required: true,
            type: String,
            unique: true
        },
        password: {
            required: true,
            type: String
        }

    },
    {
        timestamps: true
    }
)

export default mongoose.model('User', userSchema)