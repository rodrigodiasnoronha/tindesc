'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**  @type {import('@adonisjs/lucid/src/Lucid/Model')}  */
const User = use('App/Models/User')

/** @type {import('@adonisjs/lucid/src/Database')}  */
const Database = use('Database')

class DashboardController {
  /**
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, auth }) {
    const query = request.get()
    const page = query.page || 1
    const limit = query.limit || 10

    /**
     *
     * @todo
     * filtragem: não retornar usuários já curtidos ou discurtidos pelo usuário logado
     *
     */

    return await Database.table('users')
      .whereNot('id', auth.user.id)
      .paginate(page, limit)
  }
}

module.exports = DashboardController
