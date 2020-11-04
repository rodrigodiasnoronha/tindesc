'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Like extends Model {
  // usuário curtido
  userLiked() {
    return this.belongsTo('App/Models/User', 'user_liked_id')
  }

  // usuário que curtiu
  userLike() {
    return this.belongsTo('App/Models/User', 'user_like_id')
  }
}

module.exports = Like
