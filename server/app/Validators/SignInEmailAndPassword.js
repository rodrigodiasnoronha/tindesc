'use strict'

class SignInEmailAndPassword {
  get rules() {
    return {
      email: 'required|email',
      password: 'required',
    }
  }

  get messages() {
    return {
      'email.required': 'Você precis informar seu email',
      'email.email': 'Você precisa informar um email válido',
      'email.exists': 'Este e-mail não esta cadastrado nesse sistema',
      'password.required': 'Você precisa informar o campo password',
    }
  }
}

module.exports = SignInEmailAndPassword
