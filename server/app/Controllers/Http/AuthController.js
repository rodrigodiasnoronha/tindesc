/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**  @type {import('@adonisjs/lucid/src/Lucid/Model')}  */
const User = use('App/Models/User')

/** @type {import('@adonisjs/framework/src/Event')}  */
const Event = use('Event')

/** @type {import('@adonisjs/framework/src/Env')}  */
const Env = use('Env')

const jwt = require('jsonwebtoken')

class AuthController {
  /**
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async signIn({ request, auth }) {
    const email = request.input('email')
    const password = request.input('password')

    return await auth.attempt(email, password)
  }

  /**
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async signUp({ request }) {
    const user = await User.create(request.all())

    Event.fire('new::user', user)

    return user
  }

  /**
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async confirmEmail({ request, auth, response }) {
    const token = request.input('token')

    return jwt.verify(token, Env.get('JWT_SECRET'), async (error, payload) => {
      if (error)
        return response.status(400).json({
          message: 'Token inválido',
        })

      const userId = payload.id
      const user = await User.findOrFail(userId)

      user.email_confirmed = true
      await user.save()

      return user
    })
  }
}

module.exports = AuthController
