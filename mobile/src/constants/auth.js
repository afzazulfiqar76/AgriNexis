export const ACCOUNT_STATUS = {
  ACTIVE: 'active',
  SUSPENDED: 'suspended',
  PENDING: 'pending',
}

export const USER_ROLES = {
  ADMIN: 'ADMIN',
  USER: 'USER',
  MODERATOR: 'MODERATOR',
  /** @deprecated Use USER — kept for admin mock tables */
  FARMER: 'USER',
  RESEARCHER: 'USER',
}

const ROLE_LABELS = {
  [USER_ROLES.ADMIN]: 'System Administrator',
  [USER_ROLES.USER]: 'Urban Farmer',
  [USER_ROLES.MODERATOR]: 'Moderator',
}

export function mapApiUser(apiUser) {
  const role = apiUser.role ?? USER_ROLES.USER
  const name = apiUser.full_name ?? apiUser.name ?? ''
  const parts = name.trim().split(/\s+/).filter(Boolean)
  const initials =
    parts.length >= 2
      ? `${parts[0][0]}${parts[1][0]}`.toUpperCase()
      : name.slice(0, 2).toUpperCase() || 'U'

  return {
    id: String(apiUser.id),
    name,
    email: apiUser.email,
    role,
    roleLabel: ROLE_LABELS[role] ?? 'User',
    initials,
    phoneNumber: apiUser.phone_number ?? '',
    profileImage: apiUser.profile_image ?? null,
    isVerified: apiUser.is_verified ?? false,
    isActive: apiUser.is_active !== false,
    accountStatus: apiUser.is_active === false ? ACCOUNT_STATUS.SUSPENDED : ACCOUNT_STATUS.ACTIVE,
  }
}
