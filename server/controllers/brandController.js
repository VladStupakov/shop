import ApiError from "../error/ApiError.js"
import Brand from "../models/Brand.js"

class BrandController {
    async create(req, res, next) {
       const {name, country} = req.body
       const creator = req.user.id
       const brand= Brand.create({name, country, creator})
       return res.json(brand)
    }

    async getAll(req, res) {
        const brands = await Brand.find()
        return res.json(brands)
    }

    async getOne(req, res) {
        const { id } = req.params
        const brand = await Brand.findById(id)
        return res.json(brand)
    }
    async update(req, res){
        const { name, country } = req.body
        const { id } = req.params
        const brand = await Brand.findByIdAndUpdate(id, { name, country })
        return res.json(brand)
    }
    async delete(req, res){
        const { id } = req.params
        const brand = await Brand.findByIdAndDelete(id)
        return res.json(brand)
    }
}

export default new BrandController()