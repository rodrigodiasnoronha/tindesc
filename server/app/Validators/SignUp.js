'use strict'

class SignUp {
  get rules() {
    return {
      email: 'required|email|unique:users,email',
      password: 'required',
      username: 'required|unique:users,email',
      name: 'required',
    }
  }

  get messages() {
    return {
      required: 'É necessário preencher o campo de {{ field }}',
      unique: 'Este {{ field }} já esta cadastrado no sistema',
      email: 'O campo {{ field }} precisa conter um email válido',
    }
  }
}

module.exports = SignUp
