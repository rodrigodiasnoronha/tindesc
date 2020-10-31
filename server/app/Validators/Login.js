class Login {
  get rules() {
    return {
      email: 'required|email|exists:users,email',
      password: 'required',
    };
  }

  get messages() {
    return {
      'email.required': 'Necessário preencher o campo de email',
      'email.email': 'Necessário preencher com um email válido',
      'email.unique': 'Este email já está registrado',
      'password.required': 'Necessário preencher o campo password',
    };
  }
}

module.exports = Login;
