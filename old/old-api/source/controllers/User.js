const validators = require('../validators/general')
const User = require('../models/User')
const bcrypt = require('bcrypt-nodejs')
const jwt = require('jsonwebtoken')
const { secret } = require('../security/jwtSecret.json')


const generateToken = (user) => {
    const token = jwt.sign({ id: user._id, name: user.name, email: user.email, pic_path: user.pic_path }, secret, {
        expiresIn: (60 * 60 * 365) // 1 year
    })

    return token
}
const store = async (req, res) => {
    const user = { ...req.body }
    try {
        validators.existsOrError(user.name, 'Campo de nome obrigatório')
        validators.existsOrError(user.username, 'Username obrigatório')
        validators.existsOrError(user.password, 'Campo de senha obrigatório')

        const usernameExists = await User.findOne({ username: user.username })
        validators.notExistsOrError(usernameExists, 'Esse username já está em uso')

        // hash key 
        const salt = bcrypt.genSaltSync(10)
        user.password = bcrypt.hashSync(user.password, salt)

        if (req.file) {
            const userCreated = await User.create({
                ...user,
                name_key: req.file.originalname,
                size: req.file.size,
                key: req.file.filename,
                pic_path: req.file.path
            })

            // jwt token
            const token = generateToken(userCreated)

            // userCreated.password = undefined

            return res.json({ user: userCreated, token })
        }
        else {
            const userCreated = await User.create(user)

            // jwt token
            const token = generateToken(userCreated)

            // userCreated.password = undefined

            return res.json({ user: userCreated, token })
        }


    }
    catch (error) {
        return res.status(400).send({ error })
    }
}

const index = async (req, res) => {
    const page = req.query.page || 1
    console.log(page)
    const limit = 12
    const count = await User.count({})
    const offset = page * limit - limit
    try {
        const userLogger = await User.findById(req.id)
        const users = await User.find({
            $and: [
                { _id: { $ne: userLogger._id } },
                { _id: { $nin: userLogger.dislikes } },
                { _id: { $nin: userLogger.likes } },
                { gender: { $ne: userLogger.gender } }
            ]
        }).limit(limit).skip(offset)

        return res.json({ data: users, count, limit, page })
    }
    catch (error) {

        return res.status(500).send({ error })

    }
}

const remove = async (req, res) => {
    const { id } = req.params
    try {
        validators.existsOrError(id, 'ID inválido')

        const userExists = await User.findById(id)
        validators.existsOrError(userExists, 'Usuário não existe')

        await userExists.remove()
        return res.json(userExists)

    }
    catch (error) {
        return res.status(500).send({ error })
    }
}

const getById = async (req, res) => {
    const { id } = req.params
    try {
        validators.existsOrError(id, 'ID inválido')

        const userExists = await User.findById(id)
        validators.existsOrError(userExists, 'Usuário não existe')

        return res.json(userExists)
    }
    catch (error) {
        return res.status(500).send({ error })
    }
}

const getByUserName = async (req, res) =>
{
    const { username } = req.params
    try {
        validators.existsOrError(username, 'ID inválido')

        const userExists = await User.findOne({ username })
        validators.existsOrError(userExists, 'Usuário não existe')

        return res.json(userExists)
    }
    catch (error) {
        return res.status(500).send({ error })
    }  
}

const getSearchQuery = async (req, res) => 
{
    const { query } = req.query
    
    try 
    {
        const users = await User.find({ username: { $regex: '.*' + query + '.*' } }).limit(5)
        return res.json(users)
    }
    catch (error)
    {
        return res.status(500).send({ error })
    }

    res.json(query) 
}

module.exports = {getSearchQuery, store, index, remove, getById, getByUserName }
