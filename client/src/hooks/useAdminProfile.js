import { useCallback, useMemo, useState } from 'react'
import { ADMIN_MOCK_USER } from '@/constants/auth'
import { ADMIN_PROFILE_DEFAULTS } from '@/constants/admin/adminProfile'
import { useAuth } from '@/contexts/AuthContext'
import { joinFullName, splitFullName } from '@/utils/splitFullName'

function buildProfile(user, overrides) {
  const base = user ?? ADMIN_MOCK_USER
  const name = overrides.name ?? base.name
  const { firstName, lastName } = splitFullName(name)

  return {
    ...ADMIN_PROFILE_DEFAULTS,
    ...base,
    ...overrides,
    name,
    email: overrides.email ?? base.email,
    role: base.role,
    roleLabel: base.roleLabel,
    initials: base.initials,
    username: overrides.username ?? base.email,
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
