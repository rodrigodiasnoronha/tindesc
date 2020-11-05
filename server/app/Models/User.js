'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')

/** @type {import('@adonisjs/framework/src/Env')}  */
const Env = use('Env')

class User extends Model {
  static boot() {
    super.boot()

    /**
     * A hook to hash the user password before saving
     * it to the database.
     */
    this.addHook('beforeSave', async userInstance => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password)
      }
    })
  }

  /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   *
   * @return {Object}
   */
  tokens() {
    return this.hasMany('App/Models/Token')
  }

  // esconde campos na hora de retornar os dados do database
  static get hidden() {
    return ['password']
  }

  // likes likes recebidos do usuário
  likesReceived() {
    return this.hasMany('App/Models/Like', 'id', 'user_liked_id')
  }

  // likes que o usuário deu
  likesGiven() {
    return this.hasMany('App/Models/Like', 'id', 'user_like_id')
  }

  // dislike recebido pelo usuário
  dislikesReceived() {
    return this.hasMany('App/Models/Dislike', 'id', 'user_disliked_id')
  }

  // dislike que o usuário deu
  dislikesGiven() {
    return this.hasMany('App/Models/Dislike', 'id', 'user_dislike_id')
  }

  // provém a URL do avatar do usuário
  static get computed() {
    return ['avatar_url']
  }

  getAvatarUrl({ avatar }) {
    return `${Env.get('APP_URL')}/files/${avatar}`
  }
}

module.exports = User
