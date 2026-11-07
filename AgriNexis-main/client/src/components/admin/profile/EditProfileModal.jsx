import { useEffect, useState } from 'react'
import { AdminModal } from '@/components/admin/ui/AdminModal'
import { InputField } from '@/components/forms/InputField'
import { BTN_OUTLINE, BTN_PRIMARY } from '@/constants/uiClasses'
import { splitFullName } from '@/utils/splitFullName'
import { cn } from '@/utils/cn'

export function EditProfileModal({ isOpen, onClose, profile, onSubmit, isSaving }) {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    department: '',
  })

  useEffect(() => {
    if (!isOpen || !profile) return
    const { firstName, lastName } = splitFullName(profile.name)
    setForm({
      firstName: profile.firstName ?? firstName,
      lastName: profile.lastName ?? lastName,
      email: profile.email ?? '',
      phone: profile.phone ?? '',
      address: profile.address ?? '',
      department: profile.department ?? '',
    })
  }, [isOpen, profile])

  function handleChange(event) {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    onSubmit(form)
  }

  return (
    <AdminModal isOpen={isOpen} onClose={onClose} title="Edit Profile">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <InputField
            id="profile-first-name"
            name="firstName"
            label="First Name"
            value={form.firstName}
            onChange={handleChange}
            required
          />
          <InputField
            id="profile-last-name"
            name="lastName"
            label="Last Name"
            value={form.lastName}
            onChange={handleChange}
          />
        </div>
        <InputField
          id="profile-email"
          name="email"
          type="email"
          label="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <InputField
          id="profile-phone"
          name="phone"
          label="Phone"
          value={form.phone}
          onChange={handleChange}
        />
        <InputField
          id="profile-address"
          name="address"
          label="Address"
          value={form.address === '—' ? '' : form.address}
          onChange={handleChange}
        />
        <InputField
          id="profile-department"
          name="department"
          label="Department"
          value={form.department}
          onChange={handleChange}
        />
        <div className="flex flex-wrap justify-end gap-2 pt-2">
          <button type="button" onClick={onClose} className={cn(BTN_OUTLINE, 'px-4 py-2 text-sm')}>
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSaving}
            className={cn(BTN_PRIMARY, 'px-4 py-2 text-sm')}
          >
            {isSaving ? 'Saving…' : 'Save changes'}
          </button>
        </div>
      </form>
    </AdminModal>
  )
}
