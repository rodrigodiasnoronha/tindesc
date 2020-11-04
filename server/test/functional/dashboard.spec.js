'use strict'
/** @type {import('@adonisjs/vow/src/Suite')}  */
const { test, trait, before, after } = use('Test/Suite')('Auth')
trait('Test/ApiClient')
trait('Auth/Client')

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

test('return all users with pagination', async ({ client }) => {
  const userData = {
    name: 'test',
    email: 'test@test.com',
    password: 'test',
    bio: 'i am a tester',
    username: 'tester',
  }

  const user = await User.create(userData)

  const dashboardResponse = await client
    .get('/api/dashboard')
    .loginVia(user, 'jwt')
    .end()

  dashboardResponse.assertStatus(200)
})

test('fail because user is not authenticated', async ({ client }) => {
  const response = await client.get('/api/dashboard').end()

  response.assertStatus(401)
})
