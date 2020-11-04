'use strict'
/** @type {import('@adonisjs/vow/src/Suite')}  */
const { test, trait, before, after } = use('Test/Suite')('Like Tests')
trait('Test/ApiClient')
trait('Auth/Client')

/** @type {import('@adonisjs/lucid/src/Lucid/Model')}  */
const User = use('App/Models/User')

/** @type {import('@adonisjs/lucid/src/Lucid/Model')}  */
const Like = use('App/Models/Like')

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
  await Like.truncate()
})

test('return the user logged with all his likes', async ({ client }) => {
  const userData = {
    name: 'test',
    email: 'test@test.com',
    password: 'test',
    bio: 'i am a tester',
    username: 'tester',
  }

  const userData2 = {
    name: 'abc',
    email: 'abc@abc.com',
    password: 'test',
    bio: '',
    username: 'abc',
  }

  // user1 should like user2
  const user1 = await User.create(userData)
  const user2 = await User.create(userData2)

  await client.post(`/api/likes/${user2.id}`).loginVia(user1, 'jwt').end()

  const likesResponse = await client
    .get('/api/likes')
    .loginVia(user1, 'jwt')
    .end()

  likesResponse.assertStatus(200)
})

test('an user should likes another user', async ({ client }) => {
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

  // bob should like mike
  const likeResponse = await client
    .post(`/api/likes/${userMike.id}`)
    .loginVia(userBob, 'jwt')
    .end()

  likeResponse.assertStatus(200)
})

test('return unique like by id', async ({ client }) => {
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

  // evan like drew
  await Like.create({
    user_liked_id: userDrew.id,
    user_like_id: userEvan.id,
  })

  // drew like evan
  const drewLike = await Like.create({
    user_liked_id: userEvan.id,
    user_like_id: userDrew.id,
  })

  const showLikeResponse = await client
    .get(`/api/likes/${drewLike.id}`)
    .loginVia(userEvan, 'jwt')
    .end()

  showLikeResponse.assertStatus(200)
})
