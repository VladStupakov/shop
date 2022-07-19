import ApiError from "../error/ApiError.js"
import Order from "../models/Order.js"
import MathService from "../service/mathService.js"
import Product from '../models/Product.js'
import Basket from "../models/Basket.js"
const KEY = process.env.STRIPE_KEY
import Stripe from 'stripe';


const quantityCheck = async (products) => {
    for (const product of products) {
        const prod = await Product.findById(product.productId._id)
        if (prod.quantity < product.basketQuantity)
            return false
    }
    return true
}

const updateProductsQuantity = async (basket) => {
    const newBasket = await Basket.findByIdAndUpdate(basket._id, { $set: { 'products': [] } })
    for (const product of basket.products) {
        const prod = await Product.findByIdAndUpdate(product.productId._id, { "$inc": { "quantity": -`${product.basketQuantity}` } })
    }
}

class OrderController {
    async create(req, res, next) {
        const { basket, tokenId, amount } = req.body
        // const isQuantityCheck = await quantityCheck(basket.products)
        // if (!isQuantityCheck)
        //     return res.json({ error: 'quantity error' })
        // const totalPrice = MathService.getOrderTotalPrice(basket.products)
        const stripe = new Stripe(KEY);
        console.log(stripe);
        stripe.charges.create(
            {
                source: tokenId,
                amount: amount,
                currency: "UAH",
            },
            (stripeErr, stripeRes) => {
                if (stripeErr) {
                    res.status(500).json(stripeErr)
                    console.log(stripeErr)
                } else {
                    res.status(200).json(stripeRes)
                    console.log(stripeRes);
                }
            }
        )
        // const order = await Order.create({ address, user: basket.user, products: basket.products, totalPrice })
        // await updateProductsQuantity(basket)
        //return res.json(order)
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