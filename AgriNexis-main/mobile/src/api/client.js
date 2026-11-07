import axios from 'axios'
import Constants from 'expo-constants'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '../constants/storage'

const API_BASE =
  process.env.EXPO_PUBLIC_API_BASE_URL ??
  Constants.expoConfig?.extra?.apiBaseUrl ??
  'http://localhost:8003'

export const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000,
})

async function getAccessToken() {
  return AsyncStorage.getItem(ACCESS_TOKEN_KEY)
}

async function getRefreshToken() {
  return AsyncStorage.getItem(REFRESH_TOKEN_KEY)
}

export async function setTokens({ access, refresh }) {
  if (access) await AsyncStorage.setItem(ACCESS_TOKEN_KEY, access)
  if (refresh) await AsyncStorage.setItem(REFRESH_TOKEN_KEY, refresh)
}

export async function clearTokens() {
  await AsyncStorage.multiRemove([ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY])
}

async function refreshAccessToken() {
  const refresh = await getRefreshToken()
  if (!refresh) return null
  try {
    const { data } = await axios.post(
      `${API_BASE}/api/auth/refresh/`,
      { refresh },
      { headers: { 'Content-Type': 'application/json' } },
    )
    if (data.access) {
      await setTokens({ access: data.access, refresh: data.refresh ?? refresh })
      return data.access
    }
  } catch {
    await clearTokens()
  }
  return null
}

api.interceptors.request.use(async (config) => {
  if (config.skipAuth) return config
  const token = await getAccessToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config
    if (
      error.response?.status === 401 &&
      !original._retry &&
      !original.skipAuth
    ) {
      original._retry = true
      const newAccess = await refreshAccessToken()
      if (newAccess) {
        original.headers.Authorization = `Bearer ${newAccess}`
        return api(original)
      }
    }
    return Promise.reject(error)
  },
)

export { API_BASE }
