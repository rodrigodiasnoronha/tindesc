const validators = require('../validators/general')
const User = require('../models/User')
const bcrypt = require('bcrypt-nodejs')
const jwt = require('jsonwebtoken')
const { secret } = require('../security/jwtSecret.json')

const generateToken = (user) => 
{
    const token = jwt.sign({ id: user._id, name: user.name, email: user.email, pic_path: user.pic_path }, secret, {
        expiresIn: (60 * 60  * 365) // 1 year
    })

    return token
}

const store = async (req, res) =>
{
    const { username, password } = req.body
    try 
    {
        validators.existsOrError(username, 'Campo de username obrigatório')
        validators.existsOrError(password, 'Campo de senha obrigatório')

        const usernameExists = await User.findOne({ username })
        validators.existsOrError(usernameExists, 'Usuário não existe')

        // compare pass
        const isCorrectPassword = bcrypt.compareSync(password, usernameExists.password)
        if (!isCorrectPassword) throw 'Email/Senha incorretos'
        usernameExists.password = undefined

        // jwt
        const token = generateToken(usernameExists)

        return res.json({ user: usernameExists, token })
    }
    catch (error)
    {
        return res.status(400).send({ error })
    }
}

const validate = (req, res) =>
{
    const { token } = req.body

    try 
    {
        validators.existsOrError(token, 'Token não existe')

        jwt.verify(token, secret, (error, payload) => {
            if (error) throw error.message

            return true
        })
    }
    catch (error) 
    {
        return false
    }
}

module.exports = { store, validate }