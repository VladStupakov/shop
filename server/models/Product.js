import mongoose from 'mongoose'

const reviewSchema = new mongoose.Schema({
    user: {
        type: String
    },
    rating: {
        type: Number
    },
    comment: {
        type: String
    }
})

const productShema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        minlength: 20
    },
    img: {
        type: String,
        required: true,

    },
    brand: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Brand'
    },
    categories: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category'
        }
    ],
    price: {
        type: Number,
        required: true
    },
    inStock: {
        type: Boolean,
        default: true
    },
    quantity: {
        type: Number,
        required: true
    },
    reviews: [
        {
            reviewSchema
        }
    ],
    totalRating:{
        type: Number
    }
});

const Product = mongoose.model('Product', productShema)

export default Product