import ApiError from "../error/ApiError.js"
import Order from "../models/Order.js"
import MathService from "../service/mathService.js"

class OrderController {
    async create(req, res, next) {
        const { basket, address } = req.body
        const totalPrice = MathService.getOrderTotalPrice(basket.products)
        const order = await Order.create({ address, user: basket.user, products: basket.products, totalPrice })
        return res.json(order)
        //QUANTITY CHECK
        //QUANTITY CHECK
        //QUANTITY CHECK
        //QUANTITY CHECK
        //QUANTITY CHECK       
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
        const orders = await Order.findOne({user})
        return res.json(orders)
    }
}

export default new OrderController()