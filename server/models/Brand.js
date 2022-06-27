import mongoose from 'mongoose'

const brandShema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2
    },
    country: {
        type: String
    },
    creator:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

const Brand = mongoose.model('Brand', brandShema)

export default Brand