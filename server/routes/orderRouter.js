import express from 'express'
import orderController from '../controllers/orderController.js'
const router = express.Router()

router.post('/', orderController.create)
router.get('/all', orderController.getAll)
router.get('/user/:id', orderController.getAllUserOrders)
router.get('/:id', orderController.getOne)


export default router