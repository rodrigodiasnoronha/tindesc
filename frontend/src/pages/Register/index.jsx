import React from "react";

import { Formik, Form, ErrorMessage, Field } from "formik";
import * as yup from "yup";
import { Link } from "react-router-dom";
import api from "../../services/api";

const validators = yup.object().shape({
  name: yup.string().required("Campo de nome é obrigatório"),
  username: yup.string().required("Campo de usuário é obrigatório"),
  phone: yup.number("Somente valores númericos"),
  password: yup
    .string()
    .required("Campo de senha é obrigatório")
    .min(8, "Deve conter pelo menos 8 caracteres")
    .max(25, "Máximo de caracteres atingido"),
  gender: null,
  pic: null,
});

const initialState = {
  pic: null,
  inputs: {
    name: "",
    username: "",
    phone: null,
    password: "",
    gender: "",
  },
  error: null,
};

class Register extends React.Component {
  state = initialState;

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (!nextProps.file) {
      return;
    }

    this.setState({ loading: true }, () => {
      let reader = new FileReader();

      reader.onloadend = () => {
        this.setState({ loading: false, thumb: reader.result });
      };

      reader.readAsDataURL(nextProps.file);
    });
  }

  handleSubmit = async () => {
    const { username, name, password, gender, bio, phone } = this.state.inputs;
    const { pic } = this.state;
    try {
      const data = new FormData();
      data.append("pic", pic);
      data.append("name", name);
      data.append("gender", gender);
      data.append("password", password);
      data.append("bio", bio);
      data.append("phone", phone);
      data.append("username", username);

      const response = await api.post("/register", data);

      if (response.data) {
        console.log(response.data);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("name", response.data.user.name);
        localStorage.setItem("username", response.data.user.username);
        localStorage.setItem("key", response.data.user.name_key);
        localStorage.setItem("id", response.data.user._id);
        this.props.history.push("/");
      } else {
        console.log("Houve algum erro");
      }
    } catch (error) {
      console.log(error.response.data.error);
      this.setState({
        error: error.response.data.error,
      });
    }
  };

  updateFiled = (event) => {
    const { inputs } = this.state;
    inputs[event.target.name] = event.target.value;
    this.setState(inputs);
  };

  render() {
    const { error, pic } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col-12 col-sm-12 col-md-12 col-lg-6">
            <Formik>
              <Form>
                <h4>Cadastro</h4>
                <div className="form-group input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">Nome</span>
                  </div>
                  <Field
                    onChange={this.updateFiled}
                    placeholder="Digite seu nome"
                    className="form-control"
                    name="name"
                  />
                  <ErrorMessage
                    className="text-danger"
                    component="span"
                    name="name"
                  />
                </div>
                <div className="form-group input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">@</span>
                  </div>
                  <Field
                    onChange={this.updateFiled}
                    placeholder="Digite seu nome de usuário"
                    name="username"
                    className="form-control"
                  />
                  <ErrorMessage
                    className="text-danger"
                    component="span"
                    name="username"
                  />
                </div>
                <div className="form-group input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">Senha</span>
                  </div>
                  <Field
                    onChange={this.updateFiled}
                    placeholder="Digite a sua senha"
                    type="password"
                    className="form-control"
                    name="password"
                  />
                  <ErrorMessage
                    className="text-danger"
                    component="span"
                    name="password"
                  />
                </div>
                <div className="form-group input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">Telefone</span>
                  </div>
                  <Field
                    onChange={this.updateFiled}
                    name="phone"
                    placeholder="Digite seu número"
                    type="number"
                    className="form-control"
                  />
                  <ErrorMessage
                    className="text-danger"
                    component="span"
                    name="phone"
                  />
                </div>
                <div className="form-group">
                  <h5>Gênero</h5>
                  <div className="">
                    <Field
                      onChange={this.updateFiled}
                      type="radio"
                      name="gender"
                      value="M"
                      id="m"
                    />{" "}
                    <label htmlFor="m">Masculino</label>
                  </div>
                  <div className="">
                    <Field
                      onChange={this.updateFiled}
                      type="radio"
                      name="gender"
                      value="F"
                      id="f"
                    />{" "}
                    <label htmlFor="f">Feminino</label>
                  </div>
                  <div>
                    <Field
                      onChange={this.updateFiled}
                      type="radio"
                      name="gender"
                      value="outro"
                      id="outro"
                    />{" "}
                    <label htmlFor="outro">Outro</label>
                  </div>
                </div>

                <div className="form-group">
                  <div className="custom-file">
                    <input
                      className="custom-file-input"
                      id="file"
                      name="pic"
                      type="file"
                      onChange={(event) => {
                        this.setState({ pic: event.currentTarget.files[0] });
                      }}
                      className="form-control"
                    />
                    <label htmlFor="file" className="custom-file-label">
                      {pic
                        ? `Foto carregada com sucesso`
                        : "Carregue sua foto de perfil"}{" "}
                    </label>
                  </div>
                </div>
                <div className="form-group">
                  <h5>
                    <label htmlFor="bio">Biografia </label>
                  </h5>
                  <textarea
                    onChange={this.updateFiled}
                    name="bio"
                    id="bio"
                    className="form-control"
                    placeholder="Digite sua bio (pode ser a da vida toda mesmo)"
                  ></textarea>
                </div>
                {error ? <p className="text-danger">{error}</p> : <></>}

                {/* Botões para submit e redirect */}
                <button
                  onClick={this.handleSubmit}
                  className="btn btn-outline-primary"
                >
                  Cadastrar
                </button>
                <Link to="/login" className=" ml-2 btn btn-outline-secondary">
                  Já possui conta? Faça login
                </Link>
              </Form>
            </Formik>
          </div>
          <div className="col-12 col-sm-12 col-md-12 col-lg-6    ">
            Venha fazer parte dessa incrível comunidade!
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
