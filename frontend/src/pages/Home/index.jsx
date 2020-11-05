import React, { Component } from 'react'
import api from '../../services/api'
import './styles.css'
const pic = 'galo_cego.jpg'
const loadingPic = require('../../assets/loading.gif')


const initialState = { users: [], limit: null, page: 1, count: null, likes: [], dislikes: [], errorAction: {}, match: {} }
class Home extends Component {
    state = initialState

    componentDidMount() {
        this.getUsers()
    }

    getUsers = async () => {
        const token = localStorage.getItem('token')
        try {
            const response = await api.get('/users', { headers: { Authorization: `Bearer ${token}` }, params: { page: this.state.page } })
            const { limit, count, page, data } = response.data

            this.setState({ limit, count, page, users: data })
            console.log(this.state)
        }
        catch (err) {
            console.log(err.response)
        }
    }

    hideRenderMatch = () => {
        const { match } = this.state
        match.content = undefined
        this.setState({ match })
    }

    like = async (user) => {
        let { likes, users } = this.state

        try {
            likes.push(user._id)
            const token = localStorage.getItem('token')
            await api.post(`/likes/${user._id}`, null, {
                headers: { Authorization: `Bearer ${token}` }
            })

            users = users.filter(u => u._id !== user._id) // Remove user
            this.setState({ likes, users })

            const response = await api.get(`/users/${localStorage.getItem('id')}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            })
            console.log(response)
            const { data: userLogged } = response
            this.hasMatch(userLogged, user)

        }
        catch (error) {
            const { errorAction } = this.state
            error.id = user._id
            error.message = error.response
            this.setState({ errorAction })
        }
    }

    hasMatch = (userLogged, userLiked) => {
        const has = userLiked.likes.includes(userLogged._id)
        if (has) {
            const { match } = this.state
            match.content = () => {
                return (
                    <div className="match-container">
                        <img className="" src={`http://localhost:3131/files/${userLiked.key ? userLiked.key : pic}`} alt="" />
                        <h2>DEU MATCH!</h2>
                        <h3>{userLiked.name}</h3>
                        <span className="btn btn-light" onClick={this.hideRenderMatch}>Fechar</span>
                    </div>
                )
            }

            this.setState({ match })
        }
        else {
            return
        }

    }

    dislike = async (id) => {
        let { dislikes, users } = this.state
        dislikes.push(id)

        try {
            const token = localStorage.getItem('token')
            const response = await api.post(`/dislikes/${id}`, null, {
                headers: { Authorization: `Bearer ${token}` }
            })

            console.log(response)
            users = users.filter(u => u._id !== id) // Remove user


            this.setState({ dislikes, users })
        }
        catch (error) {
            const { errorAction } = this.state
            error.id = id
            error.message = error.response.data.error
            this.setState(errorAction)
        }
    }

    renderUsers = () => {
        const { users, errorAction } = this.state
        return (
            users.length > 0 ? users.map(user =>
                (
                    <div className="col-6 col-sm-6 col-md-4 col-lg-3 " key={user._id}>
                        <div className="card cartao mb-4">
                            <div className="card-img-top">
                                <img src={`http://localhost:3131/files/${user.key ? user.key : pic}`} className="profile_pic mr-auto ml-auto" alt="" />
                            </div>
                            <div className="card-body clearfix">

                                {
                                    errorAction.id ? errorAction.id === user._id ? <div className="card-text text-danger">{errorAction.message}</div> : null : null
                                }

                                <div className="h5 mb-0">{user.name} </div>
                                <div className="card-text text-murder">@{user.username} </div>
                                <div className="card-text">Bio: {user.bio} </div>
                                <div className="btn-group">
                                    <div onClick={(e) => this.like(user)} className="card-link text-danger">
                                        <i className="fa fa-heart icon"></i>
                                    </div>
                                    <div onClick={(e) => this.dislike(user._id)} className="card-link text-secondary">
                                        <i className="fa fa-thumbs-down icon"></i>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                ))
                :
                <div className="col-12 row justify-content-center">
                    <div className="col-12 d-flex justify-content-center ">
                        <img width="100" src={loadingPic} className="" />
                    </div>
                    <div className="lead">Carregando...</div>
                </div>
        )
    }

    next = async () => {
        this.setState({
            page: 2
        })
        console.log(this.state.page)
        await this.getUsers()
    }

    prev = async () => {
        this.setState({
            page: (this.state.page - 1)
        })
        await this.getUsers()
    }



    render() {
        const { match, page, count } = this.state
        return (
            <>
                <div className="container">

                    <h2>Encontre seu par ideal</h2>
                    <div className="row">
                        {
                            this.renderUsers()
                        }
                    </div>
                    <div className="row justify-content-around">
                        <button onClick={this.prev} className={`btn btn-outline-danger ${page == 1 ? 'disabled' : ''}`}>Anterior</button>
                        <span onClick={this.next} className={`btn btn-outline-danger ${page * 10 >= count ? 'disabled' : null} `}>Próximo</span>
                    </div>
                </div>
                {match.content ? match.content() : null}
            </>
        )
    }

}

export default Home