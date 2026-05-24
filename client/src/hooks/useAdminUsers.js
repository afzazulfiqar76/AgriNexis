import { useMemo, useState } from 'react'
import { ACCOUNT_STATUS, USER_ROLES } from '@/constants/auth'
import { INITIAL_ADMIN_USERS } from '@/constants/admin/adminUsers'

const PAGE_SIZE = 8

export function useAdminUsers() {
  const [users, setUsers] = useState(INITIAL_ADMIN_USERS)
  const [searchQuery, setSearchQuery] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [page, setPage] = useState(1)
  const [selectedUser, setSelectedUser] = useState(null)

  const filteredUsers = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    return users.filter((user) => {
      const roleMatch = roleFilter === 'all' || user.role === roleFilter
      const statusMatch = statusFilter === 'all' || user.status === statusFilter
      const searchMatch =
        !q ||
        user.fullName.toLowerCase().includes(q) ||
        user.email.toLowerCase().includes(q) ||
        user.userType.toLowerCase().includes(q)
      return roleMatch && statusMatch && searchMatch
    })
  }, [users, searchQuery, roleFilter, statusFilter])

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / PAGE_SIZE))

  const paginatedUsers = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE
    return filteredUsers.slice(start, start + PAGE_SIZE)
  }, [filteredUsers, page])

  function updateUser(id, updates) {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, ...updates } : u)))
    if (selectedUser?.id === id) {
      setSelectedUser((prev) => (prev ? { ...prev, ...updates } : null))
    }
  }

  function suspendUser(id) {
    updateUser(id, { status: ACCOUNT_STATUS.SUSPENDED, activityStatus: 'Inactive' })
  }

  function deleteUser(id) {
    setUsers((prev) => prev.filter((u) => u.id !== id))
    setSelectedUser((prev) => (prev?.id === id ? null : prev))
  }

  function changeRole(id, role) {
    const userTypeMap = {
      [USER_ROLES.ADMIN]: 'Admin',
      [USER_ROLES.FARMER]: 'Farmer',
      [USER_ROLES.MODERATOR]: 'Moderator',
      [USER_ROLES.RESEARCHER]: 'Researcher',
    }
    updateUser(id, { role, userType: userTypeMap[role] ?? 'Farmer' })
  }

  return {
    users: paginatedUsers,
    allFilteredCount: filteredUsers.length,
    searchQuery,
    setSearchQuery,
    roleFilter,
    setRoleFilter,
    statusFilter,
    setStatusFilter,
    page,
    setPage,
    totalPages,
    pageSize: PAGE_SIZE,
    selectedUser,
    setSelectedUser,
    suspendUser,
    deleteUser,
    changeRole,
    updateUser,
  }
}
