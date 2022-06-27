import mongoose from "mongoose"
import ApiError from "../error/ApiError.js"
import Product from "../models/Product.js"

class ProductController {
    async create(req, res, next) {
        try {
            console.log(req.user)
            let { name, description, brand, categories, price, quantity, img } = req.body
            const product = await Product.create({ name, description, price, brand, categories, quantity, img});
            return res.json(product)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res) {
        let { brandId, categoryId, limit, page } = req.query
        page = page || 1
        limit = limit || 5
        let offset = page * limit - limit
        let products;
        if (!brandId && !categoryId) {
            products = await Product.aggregate([
                {
                    '$facet': {
                        data: [{ $skip: offset }, { $limit: limit }],
                        totalQuantity: [{ $count: "total" }],
                    }
                }
            ])
        }
        if (brandId && !categoryId) {
            products = await Product.aggregate([
                {
                    $match: {
                        "brand": mongoose.Types.ObjectId(brandId)
                    }
                },
                {
                    '$facet': {
                        data: [{ $skip: offset }, { $limit: limit }],
                        totalQuantity: [{ $count: "total" }],
                    }
                }
            ])
        }
        if (!brandId && categoryId) {
            products = await Product.aggregate([
                {
                    $match: {
                        "categories": mongoose.Types.ObjectId(categoryId)
                    }
                },
                {
                    '$facet': {
                        data: [{ $skip: offset }, { $limit: limit }],
                        totalQuantity: [{ $count: "total" }],
                    }
                }
            ])
        }
        if (brandId && categoryId) {
            products = await Product.aggregate([
                {
                    $match: {
                        "categories": mongoose.Types.ObjectId(categoryId),
                        "brand": mongoose.Types.ObjectId(brandId)
                    }
                },
                {
                    '$facet': {
                        data: [{ $skip: offset }, { $limit: limit }],
                        totalQuantity: [{ $count: "total" }],
                    }
                }
            ])
        }
        return res.json(products)
    }

    async getOne(req, res) {
        const { id } = req.params
        const product = await Product.findById(id)
        return res.json(product)
    }

    async update(req, res) {
        try {
            let { name, description, brand, categories, price, quantity } = req.body
            const {id} = req.params
            // const { img } = req.files
            // let fileName = uuid.v4() + ".jpg"
            // img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const product = await Product.findByIdAndUpdate(id, { name, description, price, brand, categories, quantity, img: 'fileName' });
            return res.json(product)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async delete(req, res) {
        const { id } = req.params
        const product = await Product.findByIdAndDelete(id)
        return res.json(product)
    }
}

export default new ProductController()