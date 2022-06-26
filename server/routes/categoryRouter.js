import express from 'express'
import categoryController from '../controllers/categoryController.js'
import checkRole from '../middlewares/checkRole.js'
const router = express.Router()

router.post('/', checkRole('admin'), categoryController.create)
router.get('/', categoryController.getAll)
router.get('/:id', categoryController.getOne)
router.patch('/:id', checkRole('admin'), categoryController.update)
router.delete('/:id', checkRole('admin'), categoryController.delete)

export default router