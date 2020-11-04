'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**  @type {import('@adonisjs/lucid/src/Lucid/Model')}  */
const User = use('App/Models/User')

/**  @type {import('@adonisjs/lucid/src/Lucid/Model')}  */
const Dislike = use('App/Models/Dislike')

class DislikeController {
  /**
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ auth }) {
    const user = await auth.getUser()

    await user.load('dislikesGiven')
    await user.load('dislikesReceived')

    return user
  }

  /**
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async dislike({ params, auth }) {
    /** @type {Number}  */
    const userDislikedId = params.userDislikedId

    await User.findOrFail(userDislikedId)

    return await Dislike.create({
      user_disliked_id: userDislikedId,
      user_dislike_id: auth.user.id,
    })
  }

  async show({ params }) {
    const dislikeId = params.id

    const dislike = await Dislike.findOrFail(dislikeId)

    await dislike.load('userDisliked')
    await dislike.load('userDislike')

    return dislike
  }
}

module.exports = DislikeController
