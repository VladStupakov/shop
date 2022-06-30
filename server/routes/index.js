import express from 'express'
import userRouter from './userRouter.js'
import productRouter from './productRouter.js'
import orderRouter from './orderRouter.js'
import categoryRouter from './categoryRouter.js'
import brandRouter from './brandRouter.js'
import basketRouter from './basketRouter.js'



const router = express.Router()


router.use('/user', userRouter)
router.use('/product', productRouter)
router.use('/order', orderRouter)
router.use('/brand', brandRouter)
router.use('/category', categoryRouter)
router.use('/basket', basketRouter)



export default router