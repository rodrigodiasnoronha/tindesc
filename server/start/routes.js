'use strict';

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
const Route = use('Route');

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' };
});

Route.post('/api/auth/login', 'AuthController.login').validator('Login');
Route.post('/api/auth/register', 'AuthController.register').validator(
  'Register'
);

// Likes and Dislike Routes
Route.post('/api/likes', 'LikeController.store').middleware(['auth']);
Route.post('/api/dislikes', 'DislikeController.store').middleware(['auth']);
