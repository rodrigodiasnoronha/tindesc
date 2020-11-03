'use strict'

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

/** @type {import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User')

class UserSeeder {
  async run() {
    await User.create({
      name: 'Administrador',
      username: 'admin',
      email: 'admin@admin.com',
      password: '123',
      bio: 'I am a admin',
      is_admin: true,
    })
  }
}

module.exports = UserSeeder
