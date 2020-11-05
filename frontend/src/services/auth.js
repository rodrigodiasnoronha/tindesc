const isAuthenticated = () =>
{
    const tokenExists = localStorage.getItem('token')
    
    const result = tokenExists ?  true :  false


    return result
}

export { isAuthenticated }