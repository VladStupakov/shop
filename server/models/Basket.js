import mongoose from 'mongoose'

const basketShema = new mongoose.Schema({
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
                default: 1
            }
        }
    ],
});

const Basket = mongoose.model('Basket', basketShema)

export default Basket