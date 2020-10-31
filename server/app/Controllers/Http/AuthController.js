'use strict';
/** @type {import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');

class AuthController {
  async login({ request, auth }) {
    const { email, password } = request.all();

    const user = await auth.attempt(email, password);

    return user;
  }

  async register({ request, auth }) {
    const data = request.only(['password', 'email', 'name', 'bio', 'username']);

    const user = await User.create(data);
    const { token } = await auth.attempt(data.email, data.password);

    return { user, token };
  }
}

module.exports = AuthController;
