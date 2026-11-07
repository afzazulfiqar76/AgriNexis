import { UserCard } from '@/components/admin/users/UserCard'
import { UserDetailModal } from '@/components/admin/users/UserDetailModal'
import { AdminPageHeader } from '@/components/admin/ui/AdminPageHeader'
import { AdminSearchBar } from '@/components/admin/ui/AdminSearchBar'
import { DataTable } from '@/components/admin/ui/DataTable'
import { FilterDropdown } from '@/components/admin/ui/FilterDropdown'
import { StatusBadge } from '@/components/admin/ui/StatusBadge'
import { TablePagination } from '@/components/admin/ui/TablePagination'
import { ACCOUNT_STATUS, USER_ROLES } from '@/constants/auth'
import { useAdminUsers } from '@/hooks/useAdminUsers'
import { BTN_SECONDARY } from '@/constants/uiClasses'
import { cn } from '@/utils/cn'

const ROLE_OPTIONS = [
  { value: 'all', label: 'All roles' },
  { value: USER_ROLES.FARMER, label: 'Farmer' },
  { value: USER_ROLES.ADMIN, label: 'Admin' },
  { value: USER_ROLES.MODERATOR, label: 'Moderator' },
  { value: USER_ROLES.RESEARCHER, label: 'Researcher' },
]

const STATUS_OPTIONS = [
  { value: 'all', label: 'All statuses' },
  { value: ACCOUNT_STATUS.ACTIVE, label: 'Active' },
  { value: ACCOUNT_STATUS.SUSPENDED, label: 'Suspended' },
  { value: ACCOUNT_STATUS.PENDING, label: 'Pending' },
]

export function AdminUsersPage() {
  const {
    users,
    allFilteredCount,
    searchQuery,
    setSearchQuery,
    roleFilter,
    setRoleFilter,
    statusFilter,
    setStatusFilter,
    page,
    setPage,
    totalPages,
    pageSize,
    selectedUser,
    setSelectedUser,
    suspendUser,
    deleteUser,
    changeRole,
  } = useAdminUsers()

  const columns = [
    { key: 'name', header: 'Name', render: (u) => u.fullName },
    { key: 'email', header: 'Email', render: (u) => u.email },
    { key: 'role', header: 'Role', render: (u) => u.userType },
    {
      key: 'status',
      header: 'Status',
      render: (u) => <StatusBadge status={u.status} />,
    },
    { key: 'farms', header: 'Farms', render: (u) => u.farmCount },
    { key: 'login', header: 'Last Login', render: (u) => u.lastLogin },
    {
      key: 'actions',
      header: 'Actions',
      render: (u) => (
        <div className="flex flex-wrap gap-1">
          <button
            type="button"
            className="text-xs font-medium text-primary hover:underline"
            onClick={() => setSelectedUser(u)}
          >
            View
          </button>
          <button
            type="button"
            className="text-xs font-medium text-gray-600 hover:underline"
            onClick={() => suspendUser(u.id)}
          >
            Suspend
          </button>
          <button
            type="button"
            className="text-xs font-medium text-gray-600 hover:underline"
            onClick={() => changeRole(u.id, USER_ROLES.MODERATOR)}
          >
            Mod
          </button>
          <button
            type="button"
            className="text-xs font-medium text-red-600 hover:underline"
            onClick={() => deleteUser(u.id)}
          >
            Delete
          </button>
        </div>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Users"
        subtitle="Manage accounts, roles, and access"
        action={
          <button
            type="button"
            disabled
            title="Coming soon"
            className={cn(BTN_SECONDARY, 'h-10 px-4 opacity-60')}
          >
            Add User
          </button>
        }
      />

      <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
        <AdminSearchBar
          value={searchQuery}
          onChange={(v) => {
            setSearchQuery(v)
            setPage(1)
          }}
          placeholder="Search users…"
        />
        <FilterDropdown
          label="Role"
          value={roleFilter}
          onChange={(v) => {
            setRoleFilter(v)
            setPage(1)
          }}
          options={ROLE_OPTIONS}
        />
        <FilterDropdown
          label="Status"
          value={statusFilter}
          onChange={(v) => {
            setStatusFilter(v)
            setPage(1)
          }}
          options={STATUS_OPTIONS}
        />
      </div>

      <div className="hidden md:block">
        <DataTable columns={columns} rows={users} emptyMessage="No users match your filters." />
      </div>

      <div className="grid gap-4 md:hidden">
        {users.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            onView={setSelectedUser}
            onSuspend={suspendUser}
          />
        ))}
      </div>

      <TablePagination
        page={page}
        totalPages={totalPages}
        totalCount={allFilteredCount}
        pageSize={pageSize}
        onPageChange={setPage}
      />

      <UserDetailModal
        user={selectedUser}
        isOpen={Boolean(selectedUser)}
        onClose={() => setSelectedUser(null)}
      />
    </div>
  )
}
