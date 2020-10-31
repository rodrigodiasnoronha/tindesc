/** @type {import('@adonisjs/lucid/src/Lucid/Model')}  */
const User = use('App/Models/User');

class AuthController {
  /**
   * @param {object} ctx
   * @param {AuthSession} ctx.auth
   * @param {Request} ctx.request
   * @param {View} ctx.view
   *
   */
  async login({ request, auth }) {
    const { password, email } = request.all();

    const user = await auth.attempt(email, password);

    return user;
  }

  /**
   * @param {object} ctx
   * @param {AuthSession} ctx.auth
   * @param {Request} ctx.request
   * @param {View} ctx.view
   *
   */
  async register({ request, auth }) {
    const data = request.only(['password', 'email', 'name', 'username', 'bio']);

    const user = await User.create(data);
    const { token } = await auth.attempt(data.email, data.password);

    return { user, token };
  }
}

module.exports = AuthController;
