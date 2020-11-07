export interface User {
  id: number
  name: string
  username: string
  email: string
  bio?: string
  avatar?: string
}

export interface AuthContextProps {
  token: string
  user: User
  login(credentials: { email: string; password: string }): Promise<void>
}
