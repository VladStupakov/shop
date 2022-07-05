import express from 'express'
import categoryController from '../controllers/categoryController.js'
import checkRole from '../middlewares/checkRole.js'
import fileUploader from '../middlewares/fileUploader.js'
const router = express.Router()

router.post('/', [checkRole('admin'), fileUploader], categoryController.create)
router.get('/', categoryController.getAll)
router.get('/:id', categoryController.getOne)
router.put('/:id', checkRole('admin'), categoryController.update)
router.delete('/:id', checkRole('admin'), categoryController.delete)

export default router