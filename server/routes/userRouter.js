import express from 'express'
import userController from '../controllers/userController.js'
const router = express.Router()

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.put('/:id', userController.update)
export default router