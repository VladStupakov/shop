import mongoose from 'mongoose'

const userShema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2
    },
    surname: {
        type: String,
        required: true,
        minlength: 2
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    varified: {
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
    isAdmin: {
        type: Boolean,
        default: false
    },
},
    { timestamps: true }
);

const User = mongoose.model('User', userShema)

export default User