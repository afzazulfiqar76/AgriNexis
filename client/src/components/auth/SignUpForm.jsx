import { useState } from 'react'
import { Lock, Mail, User } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { InputField } from '@/components/forms/InputField'
import { PasswordField } from '@/components/forms/PasswordField'

const initialValues = {
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
  agreedToTerms: false,
}

export function SignUpForm() {
  const [values, setValues] = useState(initialValues)

  function handleSubmit(event) {
    event.preventDefault()
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
      <InputField
        id="full-name"
        name="fullName"
        label="Full Name"
        type="text"
        placeholder="Enter your full name"
        autoComplete="name"
        required
        value={values.fullName}
        onChange={(e) => setValues((v) => ({ ...v, fullName: e.target.value }))}
        leftIcon={<User className="size-[18px]" strokeWidth={2} />}
      />

      <InputField
        id="email"
        name="email"
        label="Email Address"
        type="email"
        placeholder="Enter your email"
        autoComplete="email"
        required
        value={values.email}
        onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
        leftIcon={<Mail className="size-[18px]" strokeWidth={2} />}
      />

      <PasswordField
        id="password"
        name="password"
        label="Password"
        placeholder="Enter your password"
        autoComplete="new-password"
        required
        value={values.password}
        onChange={(e) => setValues((v) => ({ ...v, password: e.target.value }))}
        leftIcon={<Lock className="size-[18px]" strokeWidth={2} />}
      />

      <PasswordField
        id="confirm-password"
        name="confirmPassword"
        label="Confirm Password"
        placeholder="Confirm your password"
        autoComplete="new-password"
        required
        value={values.confirmPassword}
        onChange={(e) =>
          setValues((v) => ({ ...v, confirmPassword: e.target.value }))
        }
        leftIcon={<Lock className="size-[18px]" strokeWidth={2} />}
      />

      <label className="flex cursor-pointer items-start gap-2">
        <input
          type="checkbox"
          id="terms"
          name="terms"
          className="checkbox checkbox-primary checkbox-sm mt-0.5 rounded border-gray-300"
          checked={values.agreedToTerms}
          onChange={(e) =>
            setValues((v) => ({ ...v, agreedToTerms: e.target.checked }))
          }
        />
        <span className="text-sm leading-snug text-gray-600">
          I agree to the Terms of Service and Privacy Policy
        </span>
      </label>

      <Button type="submit" className="h-12 w-full text-base">
        Sign Up
      </Button>
    </form>
  )
}
