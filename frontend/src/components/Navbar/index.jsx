import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import api from '../../services/api'
const pic = 'galo_cego.jpg'

const initialState = { isLogged: !!localStorage.getItem('token'), query: '', resultQuery: [] }
class Navbar extends Component {
    state = initialState

    componentDidMount() {
        setInterval(() => {
            this.setState({
                isLogged: localStorage.getItem('token')
            })
        }, 1000)
    }

    logOff = () => {
        localStorage.clear()
    }

    updateField = (e) => {
        this.setState({
            query: e.target.value
        })

    }

    handleSearch = async () => {
        const token = localStorage.getItem('token')

        try {
            const response = await api.get(`/search?query=${this.state.query}`, { headers: { Authorization: `Bearer ${token}` } })
            const { data } = response
            this.setState({ resultQuery: data })
        }
        catch (error) {
            console.log(error.response.data)
        }
    }

    renderNav = () => {
        const { isLogged, resultQuery } = this.state
        return <nav className="collapse navbar-collapse" id="nav">
            {
                isLogged ?
                    <div class="form">
                        <div class="input-group">
                            <input type="text" onChange={this.updateField} value={this.state.query} name="q" placeholder="Search for..." id="" class="form-control" />
                            <div class="input-group-append">
                                <button onClick={this.handleSearch} class="input-group-text btn btn-light">
                                    Search
                                     </button>
                            </div>


                        </div>

                        <div className="position-relative bg-light w-100">
                            <div className="position-absolute">
                                {
                                    resultQuery && resultQuery.length > 0 ?
                                        <ul className="list-unstyled">
                                            {
                                                resultQuery.map(user => (
                                                    <li className="text-dark col-12">
                                                        <img src={user.key ? `http://localhost:3131/files/${user.key}` : pic} width="30" alt=""/> {user.name}
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                        :
                                        null
                                }
                            </div>
                        </div>

                    </div>
                    :
                    null
            }
            <ul className="navbar-nav ml-auto">


                {
                    isLogged ?
                        <Fragment>
                            <li className="nav-item">
                                <Link to="/" className="nav-link">
                                    Home
                                    </Link>
                            </li>
                            <li className="nav-item">
                                <div className="dropdown">
                                    <span className="nav-link dropdown-toggle" data-toggle="dropdown">
                                        {localStorage.getItem('name')}
                                    </span>
                                    <div className="dropdown-menu">
                                        <Link onClick={this.logOff} className="dropdown-item" to="/login">
                                            Sair
                                            </Link>
                                    </div>
                                </div>
                            </li>
                        </Fragment>

                        :

                        <Fragment>
                            <li className="nav-item">
                                <Link to="/login" className="nav-link">
                                    Fazer Login
                                        </Link>
                            </li>

                            <li className="nav-item">
                                <Link to="/register" className="nav-link">
                                    Registre-se
                                    </Link>
                            </li>
                        </Fragment>
                }
            </ul>
        </nav>
    }

    render() {
        return <Fragment> {this.renderNav()}  </Fragment>

    }
}


export default Navbar