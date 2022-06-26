import express from 'express'
import basketController from '../controllers/basketController.js'
const router = express.Router()

router.post('/:id', basketController.addProduct)
router.patch('/:id', basketController.changeProductQuantity)
router.delete('/:id', basketController.deleteProduct)
router.get('/:id', basketController.get)

export default router