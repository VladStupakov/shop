import express from 'express'
import productController from '../controllers/productController.js'
const router = express.Router()

router.post('/', productController.create)
router.get('/', productController.getAll)
router.get('/:id', productController.getOne)

export default router