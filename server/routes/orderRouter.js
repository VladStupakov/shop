import express from 'express'
import orderController from '../controllers/orderController.js'
const router = express.Router()

router.post('/', orderController.create)
router.get('/', orderController.getAll)
router.get('/:id', orderController.getOne)

export default router