import { INITIAL_ADMIN_USERS } from './admin/adminUsers'

/** Normalized rows for mobile UserListCard (name / email / role / status). */
export const ADMIN_USERS = INITIAL_ADMIN_USERS.map((u) => ({
  id: u.id,
  name: u.fullName,
  email: u.email,
  role: u.role,
  status: u.status,
  userType: u.userType,
  farmCount: u.farmCount,
  registeredAt: u.registeredAt,
  lastLogin: u.lastLogin,
}))

export { INITIAL_ADMIN_USERS }
