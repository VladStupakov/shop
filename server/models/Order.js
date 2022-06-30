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
            basketQuantity: {
                type: Number,
                required: true
            }
        }
    ],
    totalPrice: {
        type: Number
    },
    address: {
        type: Object
    },
    status: {
        type: String,
        default: 'In process'
    }
},
    { timestamps: true }
);

const Order = mongoose.model('Order', orderShema)

export default Order