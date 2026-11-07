import { AdminManageAccountCard } from '@/components/admin/profile/AdminManageAccountCard'
import { AdminProfilePageHeader } from '@/components/admin/profile/AdminProfilePageHeader'
import { ChangePasswordModal } from '@/components/admin/profile/ChangePasswordModal'
import { EditProfileModal } from '@/components/admin/profile/EditProfileModal'
import { useAdminProfile } from '@/hooks/useAdminProfile'

export function AdminProfilePage() {
  const {
    profile,
    isSaving,
    editOpen,
    setEditOpen,
    passwordOpen,
    setPasswordOpen,
    updateProfile,
    changePassword,
  } = useAdminProfile()

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6">
      <AdminProfilePageHeader />

      <AdminManageAccountCard
        profile={profile}
        onEdit={() => setEditOpen(true)}
        onChangePassword={() => setPasswordOpen(true)}
      />

      <EditProfileModal
        isOpen={editOpen}
        onClose={() => setEditOpen(false)}
        profile={profile}
        onSubmit={updateProfile}
        isSaving={isSaving}
      />

      <ChangePasswordModal
        isOpen={passwordOpen}
        onClose={() => setPasswordOpen(false)}
        onSubmit={changePassword}
        isSaving={isSaving}
      />
    </div>
  )
}
