import mongoose from 'mongoose'

const tokenShema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        },
        refreshToken:{
            type: String,
            required: true
        }
    },
);

const Token = mongoose.model('Token', tokenShema)

export default Token