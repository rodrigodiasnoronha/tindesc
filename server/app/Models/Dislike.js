'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Dislike extends Model {
  // usuário descurtido
  userDisliked() {
    return this.belongsTo('App/Models/User', 'user_disliked_id')
  }

  // usuário que descurtiu
  userDislike() {
    return this.belongsTo('App/Models/User', 'user_dislike_id')
  }
}

module.exports = Dislike
