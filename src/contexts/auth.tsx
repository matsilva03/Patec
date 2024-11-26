'use client'
import { createContext, useContext, ReactNode, useState, useEffect } from 'react'
import api from '@/config/api'
import { IUser } from '@/interfaces/users'
import { jwtDecode } from 'jwt-decode'
import { useRouter } from 'next/navigation' // Use o hook correto para navegação

interface AuthContextType {
  isAuthenticated: boolean
  user: IUser | null
  login: (credentials: LoginCredentials) => Promise<void>
  logout: () => void
}

interface LoginCredentials {
  email: string
  password: string
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  login: async () => {},
  logout: () => {},
})

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<IUser | null>(null)
  const [redirectPath, setRedirectPath] = useState<string | null>(null) // Estado para redirecionamento
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (token) {
      validateToken(token)
    }
  }, [])

  useEffect(() => {
    if (redirectPath) {
      router.push(redirectPath)
      setRedirectPath(null)
    }
  }, [redirectPath, router])

  const validateToken = async (token: string) => {
    try {
      const decoded = jwtDecode<IUser>(token)
      if (decoded.exp < Math.floor(Date.now() / 1000)) {
        localStorage.removeItem('token')
        logout()
        setRedirectPath('/')
      } else {
        setUser(decoded)
        setIsAuthenticated(true)
        setRedirectPath(decoded.role === 'coordinator' ? '/coordinator/dashboard' : '/student/home')
      }
    } catch (error) {
      console.error(error)
      logout()
    }
  }

  const login = async (credentials: LoginCredentials) => {
    try {
      console.log('Tentando login com:', credentials)
      const response = await api.post('/auth/login', credentials)
      console.log('Resposta do login:', response.data)

      const { token } = response.data

      if (!token) {
        throw new Error('Nenhum token recebido')
      }

      // Decodificar o token para obter as informações do usuário
      const decodedUser = jwtDecode<IUser>(token)

      localStorage.setItem('token', token)
      setUser(decodedUser)
      setIsAuthenticated(true)

      const redirectPath = decodedUser.role === 'coordinator' ? '/coordinator/dashboard' : '/student/home'
      console.log('Redirecionando para:', redirectPath)
      router.push(redirectPath)
    } catch (error) {
      console.error('Erro no login:', error)
      setIsAuthenticated(false)
      setUser(null)
      throw error
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    setIsAuthenticated(false)
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider')
  }
  return context
}
