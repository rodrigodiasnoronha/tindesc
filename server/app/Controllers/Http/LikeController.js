'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**  @type {import('@adonisjs/lucid/src/Lucid/Model')}  */
const User = use('App/Models/User')

/**  @type {import('@adonisjs/lucid/src/Lucid/Model')}  */
const Like = use('App/Models/Like')

/**  @type {import('@adonisjs/lucid/src/Database')}  */
const Database = use('Database')

class LikeController {
  /**
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ auth, request }) {
    const user = await auth.getUser()

    await user.load('likesGiven')
    await user.load('likesReceived')

    return user
  }

  /**
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async like({ params, auth }) {
    /** @type {Number}  */
    const userLikedId = params.userLikedId

    await User.findOrFail(userLikedId)

    return await Like.create({
      user_liked_id: userLikedId,
      user_like_id: auth.user.id,
    })
  }

  /**
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */

  async show({ params, auth }) {
    const likeId = params.id

    const like = await Like.findOrFail(likeId)

    await like.load('userLiked')
    await like.load('userLike')

    return like
  }
}

module.exports = LikeController
