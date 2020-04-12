const routes = require('express').Router()
const multer = require('multer')
const multerConfig = require('./config/multer')
const validators = require('./validators/general')
const UserController = require('./controllers//User')
const AuthController = require('./controllers/Auth')
const LikeController = require('./controllers/LikeController')
const DislikeController = require('./controllers/DislikeController')
const { needAuthenticate } = require('./middlewares/auth')


routes.post('/login', AuthController.store)
routes.post('/register', multer(multerConfig).single('pic'), UserController.store)
routes.post('/validatetoken', AuthController.validate)


routes.post('/users', multer(multerConfig).single('pic'), UserController.store), 
routes.route('/users')
    .all(needAuthenticate)
    .get(UserController.index)


routes.route('/users/:id')
    .all(needAuthenticate)
    .delete(UserController.remove)
    .get(UserController.getById)

routes.route('/dislikes/:id')
    .all(needAuthenticate)
    .post(DislikeController.store)

routes.route('/likes/:id')
    .all(needAuthenticate)
    .post(LikeController.store)


routes.route('/username/:username')
    .all(needAuthenticate)
    .get(UserController.getByUserName)

routes.route('/search')
    .all(needAuthenticate)
    .get(UserController.getSearchQuery)

module.exports = routes