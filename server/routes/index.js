import express from 'express'
import userRouter from './userRouter.js'
import productRouter from './productRouter.js'
import orderRouter from './orderRouter.js'
import categoryRouter from './categoryRouter.js'
import brandRouter from './brandRouter.js'

const router = express.Router()

router.use('/user', userRouter)
router.use('/product', productRouter)
router.use('/order', orderRouter)
router.use('/brand', brandRouter)
router.use('/category', categoryRouter)

export default router