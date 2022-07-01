import ApiError from "../error/ApiError.js"
import Order from "../models/Order.js"
import MathService from "../service/mathService.js"
import Product from '../models/Product.js'
import Basket from "../models/Basket.js"
import paymentsService from "../service/paymentsService.js"

const quantityCheck = async (products) => {
    for (const product of products) {
        const prod = await Product.findById(product.productId._id)
        if (prod.quantity < product.basketQuantity)
            return false
    }
    return true
}

const updateProductsQuantity = async (basket) =>{
    const newBasket = await Basket.findByIdAndUpdate(basket._id, { $set: { 'products': [] } })
    for (const product of basket.products) {
        const prod = await Product.findByIdAndUpdate(product.productId._id, { "$inc": { "quantity": -`${product.basketQuantity}` }})           
    }
}

class OrderController {
    async create(req, res, next) {
        const { basket, address } = req.body
        const isQuantityCheck = await quantityCheck(basket.products)
        if (!isQuantityCheck)
            return res.json({ error: 'quantity error' })
        const totalPrice = MathService.getOrderTotalPrice(basket.products)
        const order = await Order.create({ address, user: basket.user, products: basket.products, totalPrice })
        const payment = paymentsService.createPayment()
        await updateProductsQuantity(basket)
        return res.json(order)
    }

    async getAll(req, res) {
        const orders = await Order.find()
        return res.json(orders)
    }

    async getOne(req, res) {
        const { id } = req.params
        const order = await Order.findById(id)
        return res.json(order)
    }
    async getAllUserOrders(req, res) {
        const user = req.params.id
        const orders = await Order.findOne({ user })
        return res.json(orders)
    }
}

export default new OrderController()