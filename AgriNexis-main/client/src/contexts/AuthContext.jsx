import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { tokenStorage } from '@/lib/apiClient'
import { showSessionExpired } from '@/lib/toast'
import {
  bootstrapSession,
  loginRequest,
  logoutRequest,
  readStoredUser,
  registerRequest,
} from '@/services/authApi'
import { AUTH_USER_KEY } from '@/constants/authStorage'

const AuthContext = createContext(null)

function hasAccessToken() {
  return Boolean(tokenStorage.getAccessToken())
}

export function AuthProvider({ children }) {
  // Hydrate from localStorage so refresh keeps the user on protected routes
  // while /api/auth/me/ confirms the session (avoids bounce via /signin).
  const [user, setUser] = useState(() => (hasAccessToken() ? readStoredUser() : null))
  const [isLoading, setIsLoading] = useState(() => hasAccessToken())

  useEffect(() => {
    let cancelled = false

    async function init() {
      const hadToken = hasAccessToken()
      if (!hadToken) {
        if (!cancelled) {
          setUser(null)
          setIsLoading(false)
        }
        return
      }

      try {
        const current = await bootstrapSession()
        if (!cancelled && current) {
          setUser(current)
        } else if (!cancelled) {
          setUser(null)
          if (hadToken) {
            queueMicrotask(() => showSessionExpired())
          }
        }
      } catch {
        if (!cancelled) setUser(null)
      } finally {
        if (!cancelled) setIsLoading(false)
      }
    }

    init()
    return () => {
      cancelled = true
    }
  }, [])

  const login = useCallback(async (email, password) => {
    const mapped = await loginRequest(email, password)
    setUser(mapped)
    return mapped
  }, [])

  const register = useCallback(async (payload) => {
    const mapped = await registerRequest(payload)
    setUser(mapped)
    return mapped
  }, [])

  const logout = useCallback(async () => {
    await logoutRequest()
    setUser(null)
  }, [])

  const updateUser = useCallback((partial) => {
    setUser((prev) => {
      if (!prev) return prev
      const next = { ...prev, ...partial }
      if (partial.name) {
        const parts = partial.name.trim().split(/\s+/).filter(Boolean)
        next.initials =
          parts.length >= 2
            ? `${parts[0][0]}${parts[1][0]}`.toUpperCase()
            : partial.name.slice(0, 2).toUpperCase()
      }
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(next))
      return next
    })
  }, [])

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isLoading,
      login,
      register,
      logout,
      updateUser,
    }),
    [user, isLoading, login, register, logout, updateUser],
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
