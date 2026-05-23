import { Eye, EyeOff } from 'lucide-react'
import { InputField } from '@/components/forms/InputField'
import { usePasswordVisibility } from '@/hooks/usePasswordVisibility'

export function PasswordField({
  autoComplete = 'current-password',
  leftIcon,
  ...props
}) {
  const { visible, toggle } = usePasswordVisibility()

  return (
    <InputField
      {...props}
      type={visible ? 'text' : 'password'}
      autoComplete={autoComplete}
      leftIcon={leftIcon}
      rightSlot={
        <button
          type="button"
          onClick={toggle}
          aria-label={visible ? 'Hide password' : 'Show password'}
          aria-pressed={visible}
          className="rounded p-0.5 text-gray-400 transition-colors hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary/30"
        >
          {visible ? (
            <EyeOff className="size-[18px]" strokeWidth={2} />
          ) : (
            <Eye className="size-[18px]" strokeWidth={2} />
          )}
        </button>
      }
    />
  )
}
