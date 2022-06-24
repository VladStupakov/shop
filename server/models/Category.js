import mongoose from 'mongoose'

const categoryShema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2
    }  
});

const Category = mongoose.model('Category', categoryShema)

export default Category