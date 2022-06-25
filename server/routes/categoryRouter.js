import express from 'express'
import categoryController from '../controllers/categoryController.js'
const router = express.Router()

router.post('/', categoryController.create)
router.get('/', categoryController.getAll)
router.get('/:id', categoryController.getOne)

export default router