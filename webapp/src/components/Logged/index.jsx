const login =(token) => 
{
    localStorage.setItem('token', token)
}

const logOff = () =>
{
    localStorage.clear()
}

const isLogged = () => 
{
    const tokenExists = !!localStorage.getItem('token')
    return tokenExists
}

export { login, isLogged, logOff }