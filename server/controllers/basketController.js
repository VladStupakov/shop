import mongoose from "mongoose"
import ApiError from "../error/ApiError.js"
import Basket from "../models/Basket.js"


class BasketController {
    async get(req, res, next) {
        const { id } = req.params
        const result = await Basket.findOne({user: id}).populate('products.productId').lean()
        const products = result.products.map(product =>{
            return {
                basketQuantity: product.basketQuantity,
                id: product.productId._id,
                name: product.productId.name,
                img: product.productId.img,
                description: product.productId.description,
                price: product.productId.price
            }
        })
        const basket = {
            ...result,
            products
        }
        return res.json( basket )
    }

    async addProduct(req, res) {
        const { id } = req.params
        const { productId, quantity } = req.body.params
        const basket = await Basket.findByIdAndUpdate(id, { $addToSet: { products: { productId: productId, basketQuantity: quantity } } }).populate('products.productId').lean()
        return res.json( basket )
    }

    async changeProductQuantity(req, res) {
        const { id } = req.params
        const { productId, quantity } = req.body.params
        const basket = await Basket.findOneAndUpdate({ _id: id, "products.productId": mongoose.Types.ObjectId(productId) }, { $set: { "products.$.basketQuantity": quantity } })
        return res.json({ basket })
    }

    async deleteProduct(req, res) {
        const { id } = req.params
        const { productId } = req.query
        const basket = await Basket.findOneAndUpdate(id, { $pull: { products: { productId } } })
        return res.json({ basket })
    }
}

export default new BasketController()