'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Helpers = use('Helpers')

class ProfilePictureController {
  /**
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async update({ auth, response, request }) {
    const avatar = request.file('avatar', {
      size: '2mb',
      types: ['image'],
    })

    if (!avatar)
      return response
        .status(400)
        .json({ message: 'Profile picture not provided' })

    await avatar.move(Helpers.tmpPath('uploads'), {
      name: `${new Date().getTime()}.${avatar.subtype}`,
      overwrite: true,
    })

    if (!avatar.moved()) {
      return avatar.error()
    }

    const user = await auth.getUser()

    user.avatar = avatar.fileName
    await user.save()

    return user
  }
}

module.exports = ProfilePictureController
