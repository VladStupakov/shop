import ApiError from "../error/ApiError.js"
import Basket from "../models/Basket.js"


class BasketController {
    async get(req, res, next) {
        const { id } = req.params
        const basket = await Basket.findOne({user: id}).populate('products.productId')
        return res.json( basket )
    }

    async addProduct(req, res) {
        const { id } = req.params
        const { productId } = req.body
        const basket = await Basket.findByIdAndUpdate(id, { $addToSet: { products: { productId } } })
        return res.json({ basket })
    }

    async changeProductQuantity(req, res) {
        const { id } = req.params
        const { productId, quantity } = req.body
        const basket = await Basket.findOneAndUpdate({ _id: id, "products.productId": productId }, { $set: { "products.$.basketQuantity": quantity } })
        return res.json({ basket })
    }

    async deleteProduct(req, res) {
        const { id } = req.params
        const { productId } = req.body
        const basket = await Basket.findOneAndUpdate(id, { $pull: { products: { productId } } })
        return res.json({ basket })
    }
}

export default new BasketController()