import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { AUTH_STORAGE_KEY } from '@/constants/auth'
import { FARMER_MOCK_USER } from '@/constants/auth'

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

  const login = useCallback((nextUser = FARMER_MOCK_USER) => {
    setIsAuthenticated(true)
    setUser(nextUser)
    writeStoredAuth({ isAuthenticated: true, user: nextUser })
  }, [])

  const logout = useCallback(() => {
    setIsAuthenticated(false)
    setUser(null)
    writeStoredAuth(null)
  }, [])

  const updateUser = useCallback((partial) => {
    setUser((prev) => {
      if (!prev) return prev
      const next = { ...prev, ...partial }
      if (partial.name) {
        const parts = partial.name.trim().split(/\s+/)
        next.initials =
          parts.length >= 2
            ? `${parts[0][0]}${parts[1][0]}`.toUpperCase()
            : partial.name.slice(0, 2).toUpperCase()
      }
      writeStoredAuth({ isAuthenticated: true, user: next })
      return next
    })
  }, [])

  const value = useMemo(
    () => ({
      isAuthenticated,
      user,
      login,
      logout,
      updateUser,
    }),
    [isAuthenticated, user, login, logout, updateUser],
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
