import { AdminPageHeader } from '@/components/admin/ui/AdminPageHeader'
import { InputField } from '@/components/forms/InputField'
import { InteractiveCard } from '@/components/ui/InteractiveCard'
import { BTN_PRIMARY } from '@/constants/uiClasses'
import { cn } from '@/utils/cn'

const SECTIONS = [
  {
    id: 'general',
    title: 'General',
    fields: [
      { id: 'platformName', label: 'Platform Name', defaultValue: 'AgriNexis' },
      { id: 'supportEmail', label: 'Support Email', defaultValue: 'info@agrinexis.com' },
    ],
  },
  {
    id: 'platform',
    title: 'Platform',
    fields: [
      { id: 'defaultRegion', label: 'Default Region', defaultValue: 'Lahore, Pakistan' },
      { id: 'maintenance', label: 'Maintenance Mode', defaultValue: 'Disabled' },
    ],
  },
  {
    id: 'notifications',
    title: 'Notifications',
    fields: [
      { id: 'emailAlerts', label: 'Email Alerts', defaultValue: 'Enabled' },
      { id: 'pushAlerts', label: 'Push Notifications', defaultValue: 'Enabled' },
    ],
  },
  {
    id: 'security',
    title: 'Security',
    fields: [
      { id: 'sessionTimeout', label: 'Session Timeout (min)', defaultValue: '60' },
      { id: 'twoFactor', label: 'Require 2FA for Admins', defaultValue: 'Recommended' },
    ],
  },
]

export function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Settings"
        subtitle="Platform configuration and security"
      />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {SECTIONS.map((section) => (
          <InteractiveCard key={section.id} hover="none" className="p-5 sm:p-6">
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-gray-500">
              {section.title}
            </h3>
            <div className="space-y-4">
              {section.fields.map((field) => (
                <InputField
                  key={field.id}
                  id={field.id}
                  name={field.id}
                  label={field.label}
                  defaultValue={field.defaultValue}
                  readOnly
                />
              ))}
            </div>
          </InteractiveCard>
        ))}
      </div>
      <button type="button" disabled title="API integration coming soon" className={cn(BTN_PRIMARY, 'opacity-60')}>
        Save changes
      </button>
    </div>
  )
}
