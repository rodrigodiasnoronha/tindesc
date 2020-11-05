import React from 'react'
import styled from 'styled-components'
import api from '../../services/api'
import { Link } from 'react-router-dom'
import { Formik, ErrorMessage, Field, Form } from 'formik'
import { login } from '../../components/Logged'

const LoginWrapper = styled.div`
    margin-left: auto;
    margin-right: auto;
    margin-top: 5px

    #nico {
        width: 100%;
        display: block;
        margin-left: auto;
        margin-right: auto;
    }

`


const initialState = {
    inputs: {
        username: '',
        password: ''
    },
    error: null
}
class Login extends React.Component {
    state = initialState

    handleSubmit = async () => {

        const { inputs: {username, password} } = this.state

        try {
            const response = await api.post('/login', { username, password })
            if (response.data) {
                const { token } = response.data
                localStorage.setItem('token', response.data.token)
                localStorage.setItem('name', response.data.user.name)
                localStorage.setItem('username', response.data.user.username)
                localStorage.setItem('key', response.data.user.name_key)
                localStorage.setItem('id', response.data.user._id)
                login(token)

                this.props.history.push('/')
            }
            else {

                throw new Error('Ocorreu um erro. Recarregue a página e tente novamente')
            }
        }
        catch (err) {
            this.setState({
                error: err.response.data.error
            })
        }

    }

    updateField = (event) =>
    {
        const { inputs } = this.state
        inputs[event.target.name] = event.target.value
        this.setState({ inputs })
    }

    render() {
        const { error, inputs: { password, username }  } = this.state
        return (
            <>
                <LoginWrapper className="container">
                    <div className="row mt-2">
                        <div className="col-md-12 col-lg-6">
                            <Formik initialValues={{}} >
                                <Form className="form">
                                    <h2 className="lead text-center">Login</h2>
                                    <div className="form-group input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">Usuário</span>
                                        </div>
                                        <Field onChange={this.updateField} value={username} placeholder="Digite seu usuário" className="form-control" name="username" />
                                    </div>
                                    <div className="form-group input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">Senha</span>
                                        </div>
                                        <Field onChange={this.updateField} value={password} placeholder="Digite sua senha" name="password" className="form-control" type="password" />

                                    </div>
                                    <p>
                                        <ErrorMessage component="span" name="password" className="text-danger d-block" />
                                    </p>
                                    <p>
                                        <ErrorMessage component="span" name="username" className=" text-danger" />
                                    </p>
                                    {
                                        error ? <p className="text-danger">{error} </p> : <></>
                                    }
                                    <button type="button" onClick={this.handleSubmit} className="btn btn-outline-primary">Entrar</button>

                                    <Link to="/register" className="ml-2 btn btn-outline-secondary">Registre-se </Link>
                                </Form>
                            </Formik>
                        </div>
                        <div className="col-md-12 col-lg-6">
                            <div className="py-2">
                                {/* <img src="https://i.ytimg.com/vi/3oD8tj3eBls/maxresdefault.jpg" alt="" id="nico" /> */}
                                <span className="lead">
                                    Entre para o Tindesc. Faça parte desta rede incrível
                    </span>
                            </div>
                        </div>
                    </div>
                </LoginWrapper>
            </>
        )
    }

}

export default Login