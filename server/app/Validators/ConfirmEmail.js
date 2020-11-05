'use strict'

class ConfirmEmail {
  get rules() {
    return {
      token: 'required',
    }
  }

  get messages() {
    return {
      required: 'O campo {{ field }} é requerido',
    }
  }
}

module.exports = ConfirmEmail
