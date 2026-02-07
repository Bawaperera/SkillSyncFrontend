'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { User, UserRole } from '@/lib/types/user'
import {
  getUser,
  setUser,
  logout as logoutHelper,
  mockLogin,
  mockSignup,
} from './auth-helpers'

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string, role: UserRole) => Promise<User>
  signup: (userData: {
    name: string
    email: string
    password: string
    role: UserRole
    [key: string]: any
  }) => Promise<User>
  logout: () => void
  updateUser: (updates: Partial<User>) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Load user from localStorage on mount
    const storedUser = getUser()
    setUserState(storedUser)
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string, role: UserRole) => {
    setIsLoading(true)
    try {
      const loggedInUser = await mockLogin(email, password, role)
      setUserState(loggedInUser)
      return loggedInUser
    } finally {
      setIsLoading(false)
    }
  }

  const signup = async (userData: {
    name: string
    email: string
    password: string
    role: UserRole
    [key: string]: any
  }) => {
    setIsLoading(true)
    try {
      const newUser = await mockSignup(userData)
      setUserState(newUser)
      return newUser
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    logoutHelper()
    setUserState(null)
  }

  const updateUser = (updates: Partial<User>) => {
    if (!user) return
    const updatedUser = { ...user, ...updates }
    setUserState(updatedUser)
    setUser(updatedUser)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
