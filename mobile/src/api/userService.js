import { fetchCurrentUser } from './authService'

export async function getCurrentUser() {
  return fetchCurrentUser()
}
