import ApiError from '../error/ApiError.js';
import bcrypt from 'bcrypt'
import User from '../models/User.js';
import Basket from '../models/Basket.js'
import { v4 } from 'uuid'
import mailService from '../service/mailService.js';
import tokenService from '../service/tokenService.js';
import UserDto from '../dtos/user-dto.js';

const generateTokens = async (user) => {
    const userDto = new UserDto(user)
    const tokens = tokenService.generateTokens({ ...userDto })
    await tokenService.saveToken(userDto.id, tokens.refreshToken)
    return { tokens, userDto }
}

class UserController {
    async registration(req, res, next) {
        const { email, password, isSeller } = req.body
        if (!email || !password) {
            return next(ApiError.badRequest('Wrong email or password'))
        }
        const isEmailInUse = await User.findOne({ email: email })
        if (isEmailInUse) {
            return next(ApiError.badRequest('This email already in use'))
        }

        const salt = await bcrypt.genSalt(Number(process.env.BCRYPT_SALT))
        const hashPassword = await bcrypt.hash(password, salt)

        const verificationLink = v4()
        const user = await User.create({ email, password: hashPassword, role: isSeller ? 'seller' : 'user', verificationLink })

        //PORT problems
        //await mailService.sendVarificationEmail(email, `${process.env.SERVER_URL}/user/varify/${varificationLink}`)

        const { tokens, userDto } = await generateTokens(user)

        const basket = await Basket.create({ user: user._id })

        res.cookie('refreshToken', tokens.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })

        return res.json({
            ...tokens,
            user: userDto
        })
    }

    async login(req, res, next) {
        const { email, password } = req.body
        const user = await User.findOne({ email: email })
        if (!user) {
            return next(ApiError.internal('User not found'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.internal('Wrong password'))
        }
        const { tokens, userDto } = generateTokens(user)
        return res.json({
            ...tokens,
            user: userDto
        })
    }

    async update(req, res, next) {
        const { email, password, name, surname } = req.body
        const { id } = req.params
        const salt = await bcrypt.genSalt(Number(process.env.BCRYPT_SALT))
        const hashPassword = await bcrypt.hash(password, salt)
        const user = await User.findByIdAndUpdate(id, { email, password: hashPassword, name, surname })
        const { tokens, userDto } = await generateTokens(user)
        return res.json({
            ...tokens,
            user: userDto
        })
    }

    async logout(req, res, next) {
        const { refreshToken } = req.cookies
        const token = await tokenService.removeToken(refreshToken)
        res.clearCookie('refreshToken')
        return res.json(token)
    }

    async verifyUser(req, res, next) {
        const verificationLink = req.params.link
        const user = await User.findOne({ verificationLink })
        user.verified = true
        await user.save()
        res.redirect(process.env.CLIENT_URL)
    }

    async refresh(req, res, next) {
        console.log('im called')
        const { refreshToken } = req.cookies
        if (!refreshToken)
            return next()
        const user = req.user
        const { tokens, userDto } = generateTokens(user)
        return res.json({
            ...tokens,
            user: userDto
        })
    }

}

export default new UserController()