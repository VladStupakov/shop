import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import mongoose from 'mongoose'
import router from './routes/index.js'
import path from 'path'
import errorHandler from './middlewares/errorHandler.js'
import cookieParser from 'cookie-parser'


dotenv.config()

const app = express()
const port = process.env.PORT || 3000
const __dirname = path.resolve()

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
app.use(cookieParser())
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}))
app.use('/', router)
app.use(express.static(path.join(__dirname, '/uploads')))
app.use(errorHandler)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

