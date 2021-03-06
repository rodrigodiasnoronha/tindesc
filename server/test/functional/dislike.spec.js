'use strict'

/** @type {import('@adonisjs/vow/src/Suite')}  */
const { test, trait, before, after } = use('Test/Suite')('Dislike tests')
trait('Test/ApiClient')
trait('Auth/Client')

/** @type {import('@adonisjs/lucid/src/Lucid/Model')}  */
const User = use('App/Models/User')

/** @type {import('@adonisjs/lucid/src/Lucid/Model')}  */
const Dislike = use('App/Models/Dislike')

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
  await Dislike.truncate()
})

test('return the user logged with all his dislikes', async ({ client }) => {
  const userLoggedData = {
    name: 'david',
    username: 'david',
    email: 'david@email.com',
    password: '123',
  }
  const userDislikedData = {
    name: 'fake',
    username: 'faker',
    password: '123',
    email: 'faker@email.com',
  }

  const userLogged = await User.create(userLoggedData)
  const userDisliked = await User.create(userDislikedData)

  const dislikeResponse = await client
    .post(`/api/dislikes/${userDisliked.id}`)
    .loginVia(userLogged, 'jwt')
    .end()

  dislikeResponse.assertStatus(200)
})

test('an user should dislikes another user', async ({ client }) => {
  const userData = {
    name: 'bob',
    email: 'bob@email.com',
    password: '123',
    username: 'bob',
  }

  const userData2 = {
    name: 'mike',
    email: 'mike@email.com',
    password: '123',
    username: 'mike',
  }

  const userBob = await User.create(userData)
  const userMike = await User.create(userData2)

  // bob should dislike mike
  const likeResponse = await client
    .post(`/api/dislikes/${userMike.id}`)
    .loginVia(userBob, 'jwt')
    .end()

  likeResponse.assertStatus(200)
})

test('return unique dislike by id', async ({ client }) => {
  const userData = {
    name: 'evan',
    email: 'evan@email.com',
    password: '123',
    username: 'evan',
  }

  const userData2 = {
    name: 'drew',
    email: 'drew@email.com',
    password: '123',
    username: 'drew',
  }

  const userEvan = await User.create(userData)
  const userDrew = await User.create(userData2)

  // evan dislike drew
  await Dislike.create({
    user_disliked_id: userDrew.id,
    user_dislike_id: userEvan.id,
  })

  // drew dislike evan
  const drewDislike = await Dislike.create({
    user_disliked_id: userEvan.id,
    user_dislike_id: userDrew.id,
  })

  const showDislikeResponse = await client
    .get(`/api/dislikes/${drewDislike.id}`)
    .loginVia(userEvan, 'jwt')
    .end()

  showDislikeResponse.assertStatus(200)
})
