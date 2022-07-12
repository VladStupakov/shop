import mongoose from "mongoose"
import ApiError from "../error/ApiError.js"
import Product from "../models/Product.js"
import fs from 'fs'

class ProductController {
    async create(req, res, next) {
        try {
            let { name, description, brand, categories, price, quantity, img } = req.body
            const product = await Product.create({ name, description, price, brand, categories, quantity, img });
            return res.json(product)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res) {
        let { brands, categoryId, limit, page } = req.query
        page = page || 1
        limit = limit || 100
        let offset = page * limit - limit
        let products;
        if (!brands && !categoryId) {
            products = await Product.aggregate([
                {
                    $match: {
                        quantity: { $ne: 0 }
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
        if (brands && !categoryId) {
            const b = brands.map(br => {return mongoose.Types.ObjectId(br)})
            products = await Product.aggregate([
                {
                    $match: {
                        brand: { $in: b } ,
                        quantity: { $ne: 0 }
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
        if (!brands && categoryId) {
            products = await Product.aggregate([
                {
                    $match: {
                        categories: mongoose.Types.ObjectId(categoryId),
                        quantity: { $ne: 0 }
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
        if (brands && categoryId) {
            const b = brands.map(br => {return mongoose.Types.ObjectId(br)})
            products = await Product.aggregate([
                {
                    $match: {
                        categories: mongoose.Types.ObjectId(categoryId),
                        brand: { $in: b } ,
                        quantity: { $ne: 0 }
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
        const result = {
            data: products[0].data,
            totalQuantity: products[0].totalQuantity[0]?.total
        }
        return res.json(result)
    }

    async getOne(req, res) {
        const { id } = req.params
        const product = await Product.findById(id)
        return res.json(product)
    }

    async update(req, res) {
        try {
            let { name, description, brand, categories, price, quantity } = req.body
            const { id } = req.params
            const product = await Product.findByIdAndUpdate(id, { name, description, price, brand, categories, quantity, img });
            return res.json(product)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async delete(req, res) {
        const { id } = req.params
        const product = await Product.findByIdAndDelete(id)
        fs.unlink(`uploads/${product.img}`, () => { })
        return res.json(product)
    }
}

export default new ProductController()