import ApiError from "../error/ApiError.js"
import Order from "../models/Order.js"
import MathService from "../service/mathService.js"
import Product from '../models/Product.js'
import Basket from "../models/Basket.js"
import Stripe from 'stripe';
import jwt from 'jsonwebtoken';
const stripe = new Stripe('sk_test_51LGerqKuhajSY7Jb4k82lQEc4AiT1BN9a6douRMgwV25WWzOchBrw7V75zsz7h7DRC9UAnHkC5U6Lrv8wyY0QBh100CH3MkNV6');


const quantityCheck = async (products) => {
    for (const product of products) {
        const prod = await Product.findById(product.id)
        if (prod.quantity < product.basketQuantity)
            return false
    }
    return true
}

const updateProductsQuantity = async (basket) => {
    const newBasket = await Basket.findByIdAndUpdate(basket.id, { $set: { 'products': [] } })
    for (const product of basket.products) {
        const prod = await Product.findByIdAndUpdate(product.id, { "$inc": { "quantity": -`${product.basketQuantity}` } })
    }
}

class OrderController {
    async create(req, res, next) {
        const { basket, tokenId, amount, address } = req.body
        const { refreshToken } = req.cookies
        const user = jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY)
        basket.products.forEach(product => {
            delete product['img']
            delete product['description']
        });
        const isQuantityCheck = await quantityCheck(basket.products)
        if (!isQuantityCheck)
            return res.json({ error: 'quantity error' })
        //const totalPrice = MathService.getOrderTotalPrice(basket.products)
        const charge = await stripe.charges.create(
            {
                source: tokenId,
                amount: amount,
                currency: "uah",
            }
        )
        const order = await Order.create({ address, user: user.id, products: basket.products, totalPrice: amount / 100 })
        await updateProductsQuantity(basket)
        return res.json(order)
    }

    async getAll(req, res) {
        const { page } = req.query
        const limit = 10
        const orders = await Order.find().limit(limit).skip(limit * (page - 1))
        const documentsCount = await Order.countDocuments({})
        const totalPages = Math.ceil(documentsCount / limit)
        return res.json({ orders, totalPages })
    }

    async getOne(req, res) {
        const { id } = req.params
        const order = await Order.findById(id)
        return res.json(order)
    }
    async getAllUserOrders(req, res) {
        const user = req.params.id
        const orders = await Order.find({ user: user }).populate('user').lean()
        return res.json(orders)
    }
}

export default new OrderController()