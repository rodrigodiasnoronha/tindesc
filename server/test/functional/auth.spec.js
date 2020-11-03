'use strict'
/** @type {import('@adonisjs/vow/src/Suite')}  */
const { test, trait, before, after } = use('Test/Suite')('Auth')
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

test('sign in an user', async ({ client }) => {
  const signInResponse = await client
    .post('/api/auth/signin')
    .send({ email: 'admin@admin.com', password: '123' })
    .end()

  signInResponse.assertStatus(200)
})

test('sign in should fail in validation', async ({ client }) => {
  const signInResponse = await client
    .post('/api/auth/signin')
    .send({ email: 'admin@admin.com', password: '1234' }) // wrong password
    .end()

  signInResponse.assertStatus(401)
})

test('signup user', async ({ client }) => {
  const userData = {
    name: 'test',
    email: 'test@test.com',
    password: 'test',
    bio: 'i am a tester',
    username: 'tester',
  }

  const signUpResponse = await client
    .post('/api/auth/signup')
    .send(userData)
    .end()

  signUpResponse.assertStatus(200)
})

test('user signup should fail because email is already registered', async ({
  client,
}) => {
  const userData = {
    name: 'test',
    email: 'test@test.com',
    password: 'test',
    bio: 'i am a tester',
    username: 'tester',
  }

  const signUpResponse = await client
    .post('/api/auth/signup')
    .send(userData)
    .end()

  signUpResponse.assertStatus(400)
})
