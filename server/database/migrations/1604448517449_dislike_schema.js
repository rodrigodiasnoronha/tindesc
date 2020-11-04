'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DislikeSchema extends Schema {
  up() {
    this.create('dislikes', table => {
      table.increments()

      table
        .integer('user_disliked_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
        .comment('ID od usuário descurtido')

      table
        .integer('user_dislike_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
        .comment('ID do usuário que descurtiu')

      table.timestamps()
    })
  }

  down() {
    this.drop('dislikes')
  }
}

module.exports = DislikeSchema
