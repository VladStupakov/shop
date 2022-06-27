import express from 'express'
import brandController from '../controllers/brandController.js'
import checkRole from '../middlewares/checkRole.js'
const router = express.Router()

router.post('/', checkRole('seller'), brandController.create)
router.get('/', brandController.getAll)
router.get('/:id', brandController.getOne)
router.put('/:id', checkRole('seller'), brandController.update)
router.delete('/:id', checkRole('seller'),  brandController.delete)

export default router