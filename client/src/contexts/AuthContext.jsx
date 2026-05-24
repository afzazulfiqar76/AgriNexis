import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { AUTH_STORAGE_KEY } from '@/constants/auth'
import { MOCK_USER } from '@/constants/navigation'

const AuthContext = createContext(null)

function readStoredAuth() {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (parsed?.isAuthenticated && parsed?.user) {
      return parsed
    }
  } catch {
    // ignore invalid storage
  }
  return null
}

function writeStoredAuth(state) {
  if (state?.isAuthenticated && state?.user) {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(state))
  } else {
    localStorage.removeItem(AUTH_STORAGE_KEY)
  }
}

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const stored = readStoredAuth()
    if (stored) {
      setIsAuthenticated(true)
      setUser(stored.user)
    }
  }, [])

  const login = useCallback((nextUser = MOCK_USER) => {
    setIsAuthenticated(true)
    setUser(nextUser)
    writeStoredAuth({ isAuthenticated: true, user: nextUser })
  }, [])

  const logout = useCallback(() => {
    setIsAuthenticated(false)
    setUser(null)
    writeStoredAuth(null)
  }, [])

  const value = useMemo(
    () => ({
      isAuthenticated,
      user,
      login,
      logout,
    }),
    [isAuthenticated, user, login, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
