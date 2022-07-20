import mongoose from 'mongoose'

const orderShema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    products: [
        {
            basketQuantity: {
                type: Number
            },
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product'
            },
            name: {
                type: String
            },
            price: {
                type: Number
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