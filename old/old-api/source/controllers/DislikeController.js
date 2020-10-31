const validators = require('../validators/general')
const User = require('../models/User')

const store = async (req, res) => {
    const { id } = req.params
    try {
        validators.existsOrError(id, 'ID não existe ou é inválido')

        const userLogged = await User.findById(req.id)
        validators.existsOrError(userLogged, 'Usuário logado com sessão expirada')

        const userDisliked = await User.findById(id)
        validators.existsOrError(userDisliked, 'Usuário curtido não encontrado')

        if (userLogged.dislikes.includes(userDisliked._id)) {
            return res.json(userLogged)
        }
        else {
            userLogged.dislikes.push(userDisliked._id)
            await userLogged.save()

            return res.json(userLogged)
        }
    }
    catch (error) {
        return res.status(500).send({ error })
    }
}

module.exports = { store }