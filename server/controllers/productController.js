import mongoose from "mongoose"
import ApiError from "../error/ApiError.js"
import Product from "../models/Product.js"

class ProductController {
    async create(req, res, next) {

    }

    async getAll(req, res) {
        let { brandId, categoryId, limit, page } = req.query
        page = page || 1
        limit = limit || 5
        let offset = page * limit - limit
        let products;
        if (!brandId && !categoryId) {
            products = await Product.aggregate([
                { '$facet'    : {               
                    data: [ { $skip: offset }, { $limit: limit } ],
                    totalQuantity: [ { $count: "total" } ], 
                } }
            ])
        }
        if (brandId && !categoryId) {
            products = await Product.aggregate([
                {
                    $match :{
                        "brand": mongoose.Types.ObjectId(brandId)
                    }
                },
                { '$facet'    : {               
                    data: [ { $skip: offset }, { $limit: limit } ],
                    totalQuantity: [ { $count: "total" } ], 
                } }
            ])
        }
        if (!brandId && categoryId) {
            products = await Product.aggregate([
                {
                    $match :{
                        "categories":  mongoose.Types.ObjectId(categoryId)
                    }
                },
                { '$facet'    : {               
                    data: [ { $skip: offset }, { $limit: limit } ],
                    totalQuantity: [ { $count: "total" } ], 
                } }
            ])
        }
        if (brandId && categoryId) {
            products = await Product.aggregate([
                {
                    $match :{
                        "categories":  mongoose.Types.ObjectId(categoryId),
                        "brand": mongoose.Types.ObjectId(brandId)
                    }
                },
                { '$facet'    : {               
                    data: [ { $skip: offset }, { $limit: limit } ],
                    totalQuantity: [ { $count: "total" } ], 
                } }
            ])
        }
        return res.json(products)
    }

    async getOne(req, res) {

    }
    async update(req, res) {

    }
    async delete(req, res) {

    }
}

export default new ProductController()