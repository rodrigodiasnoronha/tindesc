const validators = require('../validators/general')
const User = require('../models/User')

const store = async (req, res) => {
    const { id } = req.params
    try {
        validators.existsOrError(id, 'ID não existe ou é inválido')

        const userLogged = await User.findById(req.id)
        validators.existsOrError(userLogged, 'Usuário logado com sessão expirada')

        const userLiked = await User.findById(id)
        validators.existsOrError(userLiked, 'Usuário curtido não encontrado')

        if (userLogged.likes.includes(userLiked._id)) {
            return res.json(userLogged)
        }
        else {
            userLogged.likes.push(userLiked._id)
            await userLogged.save()

            if (userLiked.likes.includes(userLogged._id)) 
            {
                userLogged.matches.push(userLiked._id)
                userLiked.matches.push(userLogged._id)

                await userLogged.save()
                await userLiked.save()
            }

            return res.json(userLogged)
        }
    }
    catch (error) {
        return res.status(500).send({ error })
    }
}

module.exports = { store }