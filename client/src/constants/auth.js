export const AUTH_STORAGE_KEY = 'agrinexis.auth'

export const USER_ROLES = {
  ADMIN: 'admin',
  FARMER: 'farmer',
  MODERATOR: 'moderator',
  RESEARCHER: 'researcher',
}

export const ACCOUNT_STATUS = {
  ACTIVE: 'active',
  SUSPENDED: 'suspended',
  PENDING: 'pending',
}

export const ADMIN_CREDENTIALS = {
  email: 'f2022065203@umt.edu.pk',
  password: 'f2022065203',
}

export const ADMIN_MOCK_USER = {
  id: 'admin-1',
  name: 'Hassan Ahmad',
  email: ADMIN_CREDENTIALS.email,
  role: USER_ROLES.ADMIN,
  roleLabel: 'System Administrator',
  initials: 'HA',
}

export const FARMER_MOCK_USER = {
  id: 'farmer-1',
  name: 'Ahmad Khan',
  email: 'ahmad.khan@example.com',
  role: USER_ROLES.FARMER,
  roleLabel: 'Urban Farmer',
  initials: 'AK',
}
