import express from 'express'
import productController from '../controllers/productController.js'
import checkRole from '../middlewares/checkRole.js'
const router = express.Router()

router.post('/', checkRole('seller'), productController.create)
router.get('/', productController.getAll)
router.get('/:id', productController.getOne)
router.patch('/:id', checkRole('seller'), productController.update)
router.delete('/:id', checkRole('seller'), productController.delete)


export default router