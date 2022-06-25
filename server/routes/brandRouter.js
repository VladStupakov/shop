import express from 'express'
import brandController from '../controllers/brandController.js'
const router = express.Router()

router.post('/', brandController.create)
router.get('/', brandController.getAll)
router.get('/:id', brandController.getOne)

export default router