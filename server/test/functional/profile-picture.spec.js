'use strict'

const Helpers = use('Helpers')

/** @type {import('@adonisjs/vow/src/Suite')}  */
const { test, before, after, trait } = use('Test/Suite')('Profile Picture')

trait('Auth/Client')
trait('Test/ApiClient')

/** @type {import('@adonisjs/lucid/src/Lucid/Model')}  */
const User = use('App/Models/User')

before(async () => {
  await User.create({
    name: 'admin',
    email: 'admin@admin.com',
    password: '123',
    username: 'admin',
    bio: 'i am admin',
    is_admin: true,
  })
})

after(async () => {
  await User.truncate()
})

test('update user profile adding a profile picture', async ({ client }) => {
  const userData = {
    name: 'Charlie',
    username: 'charlie',
    email: 'charlie@email.com',
    password: '123',
  }

  const user = await User.create(userData)

  const addProfilePicResponse = await client
    .put('/api/profile/avatar')
    .loginVia(user, 'jwt')
    .attach('avatar', Helpers.tmpPath('tests/assets/kageyama.jpg'))
    .end()

  addProfilePicResponse.assertStatus(200)
})
