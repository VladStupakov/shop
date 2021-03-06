import express from 'express'
import productController from '../controllers/productController.js'
import checkRole from '../middlewares/checkRole.js'
import fileUploader from '../middlewares/fileUploader.js'
const router = express.Router()

router.post('/', [checkRole('seller'), fileUploader], productController.create)
router.get('/', productController.getAll)
router.get('/:id', productController.getOne)
router.put('/:id', checkRole('seller'), productController.update)
router.delete('/:id', checkRole('seller'), productController.delete)


export default router