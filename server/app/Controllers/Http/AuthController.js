/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**  @type {import('@adonisjs/lucid/src/Lucid/Model')}  */
const User = use('App/Models/User')

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
    return await User.create(request.all())
  }
}

module.exports = AuthController
