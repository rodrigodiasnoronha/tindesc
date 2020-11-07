import React, { createContext, useState, useContext, useCallback } from 'react'
import { AuthContextProps, User } from '../interfaces'
import api from '../services/api'

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)

interface LoginCredentials {
  email: string
  password: string
}

const AuthProvider: React.FC = ({ children }) => {
  const [token, setToken] = useState<string>('')
  const [user, setUser] = useState<User>({} as User)

  const login = useCallback(async ({ email, password }: LoginCredentials) => {
    const response = await api.post('/api/auth/signin', { email, password })

    console.log(response)
  }, [])

  return (
    <AuthContext.Provider value={{ token, user, login }}>
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = () => useContext(AuthContext)

export { AuthProvider, useAuth }
