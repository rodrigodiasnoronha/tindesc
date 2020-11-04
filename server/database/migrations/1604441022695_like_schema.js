'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class LikeSchema extends Schema {
  up() {
    this.create('likes', table => {
      table.increments()

      table
        .integer('user_liked_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
        .comment('ID do usuário que foi curtido')

      table
        .integer('user_like_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
        .comment('ID do usuario que deu o like')

      table.timestamps()
    })
  }

  down() {
    this.drop('likes')
  }
}

module.exports = LikeSchema
