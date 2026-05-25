import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import * as authService from '../api/authService'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const current = await authService.bootstrapSession()
        if (!cancelled) setUser(current)
      } finally {
        if (!cancelled) setIsLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  const login = useCallback(async (email, password) => {
    const mapped = await authService.login(email, password)
    setUser(mapped)
    return mapped
  }, [])

  const register = useCallback(async (payload) => {
    const mapped = await authService.register(payload)
    setUser(mapped)
    return mapped
  }, [])

  const logout = useCallback(async () => {
    await authService.logout()
    setUser(null)
  }, [])

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isLoading,
      login,
      register,
      logout,
    }),
    [user, isLoading, login, register, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
