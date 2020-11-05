/** @type {import('@adonisjs/framework/src/Event')}  */
const Event = use('Event')

/** @type {import('@adonisjs/mail/src/Mail')}  */
const Mail = use('Mail')

/** @type {import('@adonisjs/framework/src/Env')}  */
const Env = use('Env')

const jwt = require('jsonwebtoken')

Event.on('new::user', async user => {
  const token = jwt.sign({ id: user.id }, Env.get('JWT_SECRET'), {
    expiresIn: '10d',
  })

  // URL recuperar senha
  const url = `${Env.get('FRONT_URL')}/confirm_email?token=${token}`

  if (Env.get('NODE_ENV') === 'testing') {
    Mail.fake()

    await Mail.send('email.user_register', { ...user, url }, message => {
      message
        .to(user.email)
        .from('tindesc@email.com')
        .subject('Bem vindo ao Tindesc!')
    })

    Mail.restore()
  } else {
    await Mail.send('email.user_register', user, message => {
      message
        .to(user.email)
        .from('tindesc@email.com')
        .subject('Bem vindo ao Tindesc!')
    })
  }
})
