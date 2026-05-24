import { useState } from 'react'
import { Lock, Mail } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { InputField } from '@/components/forms/InputField'
import { PasswordField } from '@/components/forms/PasswordField'
import { ADMIN_CREDENTIALS, ADMIN_MOCK_USER, FARMER_MOCK_USER } from '@/constants/auth'
import { ADMIN_ROUTES } from '@/constants/adminRoutes'
import { ROUTES } from '@/constants/routes'
import { useAuth } from '@/contexts/AuthContext'

const initialValues = {
  email: '',
  password: '',
  rememberMe: false,
}

export function SignInForm() {
  const [values, setValues] = useState(initialValues)
  const { login } = useAuth()
  const navigate = useNavigate()

  function handleSubmit(event) {
    event.preventDefault()
    const email = values.email.trim().toLowerCase()
    const password = values.password
    const isAdmin =
      email === ADMIN_CREDENTIALS.email.toLowerCase() &&
      password === ADMIN_CREDENTIALS.password
    login(isAdmin ? ADMIN_MOCK_USER : FARMER_MOCK_USER)
    navigate(isAdmin ? ADMIN_ROUTES.DASHBOARD : ROUTES.HOME)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
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
        autoComplete="current-password"
        required
        value={values.password}
        onChange={(e) => setValues((v) => ({ ...v, password: e.target.value }))}
        leftIcon={<Lock className="size-[18px]" strokeWidth={2} />}
      />

      <div className="flex items-center justify-between gap-4">
        <label className="flex cursor-pointer items-center gap-2">
          <input
            type="checkbox"
            id="remember-me"
            name="rememberMe"
            className="checkbox checkbox-primary checkbox-sm rounded border-gray-300"
            checked={values.rememberMe}
            onChange={(e) =>
              setValues((v) => ({ ...v, rememberMe: e.target.checked }))
            }
          />
          <span className="text-sm text-gray-600">Remember me</span>
        </label>
        <a
          href="#"
          className="shrink-0 text-sm font-medium text-primary hover:underline"
        >
          Forgot password?
        </a>
      </div>

      <Button type="submit" className="h-12 w-full text-base">
        Sign In
      </Button>
    </form>
  )
}
