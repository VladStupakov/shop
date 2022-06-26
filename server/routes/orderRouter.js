import express from 'express'
import orderController from '../controllers/orderController.js'
const router = express.Router()

router.post('/', orderController.create)
router.get('/', orderController.getAllUserOrders)
router.get('/:id', orderController.getOne)
router.get('/all', orderController.getAll)

export default router