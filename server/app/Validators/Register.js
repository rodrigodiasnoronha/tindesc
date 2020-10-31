'use strict';

class Register {
  get rules() {
    return {
      email: 'required|email|unique:users',
      password: 'required',
      name: 'required',
      username: 'required|unique:users',
    };
  }

  get messages() {
    return {
      'email.required': 'Necessário preencher o campo de email',
      'email.email': 'Necessário preencher com um email válido',
      'email.unique': 'Este email já está registrado',
      'password.required': 'Necessário preencher o campo password',
      'username.required': 'Necessário preencher o campo de username',
      'username.unique': 'Este username já esta em uso',
    };
  }
}

module.exports = Register;
