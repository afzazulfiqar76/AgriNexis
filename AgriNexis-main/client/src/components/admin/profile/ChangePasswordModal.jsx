import { useState } from 'react'
import { AdminModal } from '@/components/admin/ui/AdminModal'
import { PasswordField } from '@/components/forms/PasswordField'
import { BTN_OUTLINE, BTN_PRIMARY } from '@/constants/uiClasses'
import { cn } from '@/utils/cn'

export function ChangePasswordModal({ isOpen, onClose, onSubmit, isSaving }) {
  const [form, setForm] = useState({
    current: '',
    next: '',
    confirm: '',
  })
  const [error, setError] = useState('')

  function handleChange(event) {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setError('')
  }

  function handleSubmit(event) {
    event.preventDefault()
    if (form.next.length < 8) {
      setError('New password must be at least 8 characters.')
      return
    }
    if (form.next !== form.confirm) {
      setError('Passwords do not match.')
      return
    }
    onSubmit()
    setForm({ current: '', next: '', confirm: '' })
  }

  function handleClose() {
    setForm({ current: '', next: '', confirm: '' })
    setError('')
    onClose()
  }

  return (
    <AdminModal isOpen={isOpen} onClose={handleClose} title="Change Password">
      <form onSubmit={handleSubmit} className="space-y-4">
        <PasswordField
          id="current-password"
          name="current"
          label="Current Password"
          value={form.current}
          onChange={handleChange}
          required
        />
        <PasswordField
          id="new-password"
          name="next"
          label="New Password"
          value={form.next}
          onChange={handleChange}
          required
        />
        <PasswordField
          id="confirm-password"
          name="confirm"
          label="Confirm New Password"
          value={form.confirm}
          onChange={handleChange}
          required
        />
        {error && (
          <p className="text-sm font-medium text-red-600" role="alert">
            {error}
          </p>
        )}
        <div className="flex flex-wrap justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={handleClose}
            className={cn(BTN_OUTLINE, 'px-4 py-2 text-sm')}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSaving}
            className={cn(BTN_PRIMARY, 'px-4 py-2 text-sm')}
          >
            {isSaving ? 'Updating…' : 'Update password'}
          </button>
        </div>
      </form>
    </AdminModal>
  )
}
