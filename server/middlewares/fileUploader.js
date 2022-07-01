import multer from 'multer'
import { v4 } from 'uuid'
import path from 'path'

let storage = multer.diskStorage({
    destination: (req, file, cb) => {      
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        const fileName = v4() + path.extname(file.originalname)
        req.body.img = fileName
        cb(null, fileName)
    }
})

const upload = multer({ storage: storage }).array('img')

export default upload