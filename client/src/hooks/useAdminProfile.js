import { useCallback, useMemo, useState } from 'react'
import { ADMIN_PROFILE_DEFAULTS } from '@/constants/admin/adminProfile'
import { AUTH_MESSAGES } from '@/constants/authMessages'
import { useAuth } from '@/contexts/AuthContext'
import { showSuccess } from '@/lib/toast'
import { joinFullName, splitFullName } from '@/utils/splitFullName'

function buildProfile(user, overrides) {
  if (!user) return null

  const name = overrides.name ?? user.name
  const { firstName, lastName } = splitFullName(name)

  return {
    ...ADMIN_PROFILE_DEFAULTS,
    ...user,
    ...overrides,
    name,
    email: overrides.email ?? user.email,
    role: user.role,
    roleLabel: user.roleLabel,
    initials: user.initials,
    username: overrides.username ?? user.email,
    firstName: overrides.firstName ?? firstName,
    lastName: overrides.lastName ?? lastName,
  }
}

export function useAdminProfile() {
  const { user, updateUser } = useAuth()
  const [overrides, setOverrides] = useState({})
  const [isSaving, setIsSaving] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [passwordOpen, setPasswordOpen] = useState(false)

  const profile = useMemo(() => buildProfile(user, overrides), [user, overrides])

  const updateProfile = useCallback(
    async (partial) => {
      setIsSaving(true)
      await new Promise((resolve) => setTimeout(resolve, 400))
      const name = joinFullName(partial.firstName, partial.lastName) || partial.name
      updateUser({ name, email: partial.email })
      setOverrides((prev) => ({
        ...prev,
        name,
        email: partial.email,
        firstName: partial.firstName,
        lastName: partial.lastName,
        ...(partial.phone !== undefined && { phone: partial.phone }),
        ...(partial.address !== undefined && { address: partial.address }),
        ...(partial.department !== undefined && { department: partial.department }),
      }))
      setIsSaving(false)
      setEditOpen(false)
    },
    [updateUser],
  )

  const changePassword = useCallback(async () => {
    setIsSaving(true)
    await new Promise((resolve) => setTimeout(resolve, 400))
    setIsSaving(false)
    setPasswordOpen(false)
    showSuccess(AUTH_MESSAGES.success.changesSaved)
  }, [])

  return {
    profile,
    isSaving,
    editOpen,
    setEditOpen,
    passwordOpen,
    setPasswordOpen,
    updateProfile,
    changePassword,
  }
}
