import mongoose from 'mongoose'

const userShema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 2
    },
    surname: {
        type: String,
        minlength: 2
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    verified: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        required: true,
    },
    isLogged: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        default: 'user'
    },
    verificationLink: {
        type: String
    }
},
    { timestamps: true }
);

const User = mongoose.model('User', userShema)

export default User