'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

/**
 *
 * Dashboard routes
 *
 */

Route.get('/api/dashboard', 'DashboardController.usersList').middleware([
  'auth',
])

/**
 *
 * Likes user Auth
 *
 */

Route.get('/api/likes', 'LikeController.likesGivenUserAuth').middleware([
  'auth',
])
Route.post('/api/likes/:userLikedId', 'LikeController.like').middleware([
  'auth',
])

/**
 *
 * Auth routes
 *
 */

Route.post('/api/auth/signup', 'AuthController.signUp').validator('SignUp')
Route.post('/api/auth/signin', 'AuthController.signIn').validator(
  'SignInEmailAndPassword'
)
