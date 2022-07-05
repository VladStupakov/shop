import ApiError from "../error/ApiError.js"
import Category from '../models/Category.js'

class CategoryController {
    async create(req, res) {
        const { name, img } = req.body
        const category = await Category.create({ name, img })
        return res.json(category)
    }

    async getAll(req, res) {
        const data = await Category.find()
        return res.json(data)
    }

    async getOne(req, res) {
        const { id } = req.params
        const category = await Category.findById(id)
        return res.json(category)
    }
    async update(req, res) {
        const { name } = req.body
        const { id } = req.params
        const category = await Category.findByIdAndUpdate(id, { name })
        return res.json(category)
    }
    async delete(req, res) {
        const { id } = req.params
        const category = await Category.findByIdAndDelete(id)
        return res.json(category)
    }
}

export default new CategoryController()