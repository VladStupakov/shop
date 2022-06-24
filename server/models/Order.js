import mongoose from 'mongoose'

const orderShema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product'
            },
            quantity: {
                type: Number,
                default: 1
            }
        }
    ],
    totalPrice: {
        type: Number
    },
    address: {
        type: Object
    },
    status:{
        type: String,
        default: 'In process'
    }
});

const Order = mongoose.model('Order', orderShema)

export default Order