import { useState } from 'react'
import { Lock, Mail } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { InputField } from '@/components/forms/InputField'
import { PasswordField } from '@/components/forms/PasswordField'
import { getLoginSuccessMessage } from '@/constants/authMessages'
import { ROUTES } from '@/constants/routes'
import { useAuth } from '@/contexts/AuthContext'
import { showAuthApiError, showError, showSuccess } from '@/lib/toast'
import { validateSignIn } from '@/utils/authValidation'

const initialValues = {
  email: '',
  password: '',
  rememberMe: false,
}

function resolvePostLoginPath(location) {
  const from = location.state?.from?.pathname
  if (
    typeof from === 'string' &&
    from.startsWith('/') &&
    !from.startsWith(ROUTES.SIGN_IN) &&
    !from.startsWith(ROUTES.SIGN_UP)
  ) {
    // Do not auto-send users into the admin panel after login.
    if (from === ROUTES.ADMIN || from.startsWith(`${ROUTES.ADMIN}/`)) {
      return ROUTES.HOME
    }
    return from
  }
  return ROUTES.HOME
}

export function SignInForm() {
  const [values, setValues] = useState(initialValues)
  const [submitting, setSubmitting] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  async function handleSubmit(event) {
    event.preventDefault()

    const validation = validateSignIn(values)
    if (!validation.ok) {
      showError(validation.message)
      return
    }

    setSubmitting(true)

    try {
      const mapped = await login(values.email.trim(), values.password)
      navigate(resolvePostLoginPath(location), { replace: true })
      queueMicrotask(() => showSuccess(getLoginSuccessMessage(mapped)))
    } catch (err) {
      showAuthApiError(err)
    } finally {
      setSubmitting(false)
    }
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

      <Button type="submit" className="h-12 w-full text-base" disabled={submitting}>
        {submitting ? 'Signing in…' : 'Sign In'}
      </Button>
    </form>
  )
}
