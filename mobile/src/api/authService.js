import AsyncStorage from '@react-native-async-storage/async-storage'
import { mapApiUser } from '../constants/auth'
import { ACCESS_TOKEN_KEY, AUTH_USER_KEY, REFRESH_TOKEN_KEY } from '../constants/storage'
import { api, clearTokens, setTokens } from './client'

async function persistSession(data) {
  const { user, tokens } = data
  await setTokens(tokens)
  const mapped = mapApiUser(user)
  await AsyncStorage.setItem(AUTH_USER_KEY, JSON.stringify(mapped))
  return mapped
}

export async function readStoredUser() {
  try {
    const raw = await AsyncStorage.getItem(AUTH_USER_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export async function clearStoredSession() {
  await clearTokens()
  await AsyncStorage.removeItem(AUTH_USER_KEY)
}

export async function login(email, password) {
  const { data } = await api.post(
    '/api/auth/login/',
    { email, password },
    { skipAuth: true },
  )
  return persistSession(data)
}

export async function register({ fullName, email, password, phoneNumber }) {
  const { data } = await api.post(
    '/api/auth/register/',
    {
      full_name: fullName,
      email,
      password,
      phone_number: phoneNumber || '',
    },
    { skipAuth: true },
  )
  return persistSession(data)
}

export async function logout() {
  const refresh = await AsyncStorage.getItem(REFRESH_TOKEN_KEY)
  try {
    if (refresh) {
      await api.post('/api/auth/logout/', { refresh })
    }
  } finally {
    await clearStoredSession()
  }
}

export async function fetchCurrentUser() {
  const { data } = await api.get('/api/auth/me/')
  const mapped = mapApiUser(data)
  await AsyncStorage.setItem(AUTH_USER_KEY, JSON.stringify(mapped))
  return mapped
}

export async function bootstrapSession() {
  const access = await AsyncStorage.getItem(ACCESS_TOKEN_KEY)
  if (!access) {
    await clearStoredSession()
    return null
  }
  try {
    return await fetchCurrentUser()
  } catch {
    await clearStoredSession()
    return null
  }
}
