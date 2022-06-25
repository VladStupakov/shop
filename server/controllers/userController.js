import ApiError from '../error/ApiError.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/User.js';
import Basket from '../models/Basket.js'

const generateJwt = (id, email, role) => {
    return jwt.sign(
        { id, email, role },
        process.env.SECRET_KEY,
        { expiresIn: '24h' }
    )
}

class UserController {
    async registration(req, res, next) {
        const { email, password} = req.body
        if (!email || !password) {
            return next(ApiError.badRequest('Wrong email or password'))
        }
        const isEmailInUse = await User.findOne({email: email})
        if (isEmailInUse) {
            return next(ApiError.badRequest('This email already in use'))
        }
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)
        const user = await User.create({ email, password: hashPassword })
        const basket = await Basket.create({ user: user._id })
        const token = generateJwt(user._id, user.email, user.role)
        return res.json({ token })
    }

    async login(req, res, next) {
        const { email, password } = req.body
        const user = await User.findOne({email: email})
        if (!user) {
            return next(ApiError.internal('User not found'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.internal('Wrong password'))
        }
        const token = generateJwt(user._id, user.email, user.role)
        return res.json({ token })
    }

    async check(req, res, next) {
        const token = generateJwt(req.user._id, req.user.email, req.user.role)
        return res.json({ token })
    }
}

export default new UserController()