import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import mongoose from 'mongoose'
import userRouter from './routes/user.js'
import productRouter from './routes/product.js'

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

const conection_url = process.env.DB_CONNECTION_STRING
mongoose
    .connect(conection_url)
    .then(() => {
        console.log('succesfull connection to db')
    })
    .catch((error) => {
        console.log(error)
    })


app.use(express.json())    
app.use(cors())
app.use('/', userRouter)
app.use('/', productRouter)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))