import jwt from 'jsonwebtoken'
import Token from '../models/Token.js'

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_KEY, { expiresIn: '30m' })
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_KEY, { expiresIn: '30d' })
        return {
            accessToken,
            refreshToken
        }
    }

    async saveToken(userId, refreshToken) {
        const tokenData = await Token.findOne({ user: userId })
        if (tokenData) {
            tokenData.refreshToken = refreshToken
            return tokenData.save()
        }
        const token = await Token.create({ user: userId, refreshToken })
        return token
    }

    async removeToken(refreshToken) {
        const token = await Token.deleteOne({ refreshToken })
        return token
    }

    validateRefreshToken(token){
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_KEY)
            return userData
        } catch (error) {
            return null
        }
    }

    async findToken(refreshToken) {
        const token = await Token.findOne({ refreshToken })
        return token
    }

}

export default new TokenService()