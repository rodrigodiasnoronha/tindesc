const jwt = require('jsonwebtoken')
const { secret } = require('../security/jwtSecret.json')
const User = require('../models/User')
const validators = require('../validators/general')

const needAuthenticate = (req, res, next) => {
    try {
        const { authorization } = req.headers
        validators.existsOrError(authorization, 'No token found')

        const parts = authorization.split(' ')
        const [bearer, token] = parts

        validators.existsOrError(token, 'No token')

        jwt.verify(token, secret, async (error, payload) => 
        {
            validators.notExistsOrError(error, error)
            const userExists = await User.findById(payload.id)
            validators.existsOrError(userExists, 'Invalid user')

            req.id = userExists._id
            next()
        })

    }
    catch (error) {
        return res.status(401).send({ error })
    }
}

module.exports = { needAuthenticate }