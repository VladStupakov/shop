import express from 'express'
import Product from '../models/Product.js'
import Brand from '../models/Brand.js'
import Category from '../models/Category.js'

const router = express.Router()

router.get('/', (req, res) => {
    Product.find().populate('brand').populate('categories')
        .then((result) => res.send(result))
        .catch((error) => res.send(error.message))
})

export default router