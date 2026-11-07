import { useState } from 'react'
import { Send } from 'lucide-react'
import { FormSelect } from '@/components/forms/FormSelect'
import { FormTextarea } from '@/components/forms/FormTextarea'
import { InputField } from '@/components/forms/InputField'
import { INQUIRY_TYPES } from '@/constants/contact'
import {
  CONTACT_FORM_FIELDS,
  EMAIL_PATTERN,
  INITIAL_CONTACT_FORM,
  REQUIRED_FIELDS,
} from '@/constants/contactForm'
import { BTN_PRIMARY } from '@/constants/uiClasses'
import { cn } from '@/utils/cn'

function validateForm(values) {
  const nextErrors = {}

  for (const field of REQUIRED_FIELDS) {
    if (!String(values[field] ?? '').trim()) {
      nextErrors[field] = 'This field is required.'
    }
  }

  if (
    values[CONTACT_FORM_FIELDS.EMAIL] &&
    !EMAIL_PATTERN.test(values[CONTACT_FORM_FIELDS.EMAIL].trim())
  ) {
    nextErrors[CONTACT_FORM_FIELDS.EMAIL] = 'Enter a valid email address.'
  }

  return nextErrors
}

export function ContactForm() {
  const [values, setValues] = useState(INITIAL_CONTACT_FORM)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  function handleChange(field) {
    return (event) => {
      setValues((prev) => ({ ...prev, [field]: event.target.value }))
      if (errors[field]) {
        setErrors((prev) => {
          const next = { ...prev }
          delete next[field]
          return next
        })
      }
      if (submitted) setSubmitted(false)
    }
  }

  function handleSubmit(event) {
    event.preventDefault()
    const nextErrors = validateForm(values)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) return

    // Ready for API integration: POST /api/contact with `values`
    setSubmitted(true)
    setValues(INITIAL_CONTACT_FORM)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <InputField
          name={CONTACT_FORM_FIELDS.FULL_NAME}
          label="Full Name *"
          placeholder="Your full name"
          value={values[CONTACT_FORM_FIELDS.FULL_NAME]}
          onChange={handleChange(CONTACT_FORM_FIELDS.FULL_NAME)}
          error={errors[CONTACT_FORM_FIELDS.FULL_NAME]}
          autoComplete="name"
        />
        <InputField
          name={CONTACT_FORM_FIELDS.EMAIL}
          type="email"
          label="Email *"
          placeholder="you@example.com"
          value={values[CONTACT_FORM_FIELDS.EMAIL]}
          onChange={handleChange(CONTACT_FORM_FIELDS.EMAIL)}
          error={errors[CONTACT_FORM_FIELDS.EMAIL]}
          autoComplete="email"
        />
      </div>

      <FormSelect
        name={CONTACT_FORM_FIELDS.INQUIRY_TYPE}
        label="Inquiry Type *"
        options={INQUIRY_TYPES}
        value={values[CONTACT_FORM_FIELDS.INQUIRY_TYPE]}
        onChange={handleChange(CONTACT_FORM_FIELDS.INQUIRY_TYPE)}
        error={errors[CONTACT_FORM_FIELDS.INQUIRY_TYPE]}
      />

      <FormTextarea
        name={CONTACT_FORM_FIELDS.MESSAGE}
        label="Message *"
        placeholder="How can we help you?"
        value={values[CONTACT_FORM_FIELDS.MESSAGE]}
        onChange={handleChange(CONTACT_FORM_FIELDS.MESSAGE)}
        error={errors[CONTACT_FORM_FIELDS.MESSAGE]}
      />

      {submitted && (
        <p
          className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800"
          role="status"
        >
          Thank you! Your message has been received. We will get back to you soon.
        </p>
      )}

      <button type="submit" className={cn(BTN_PRIMARY, 'h-12 w-full text-sm uppercase tracking-wide')}>
        <Send className="size-4" strokeWidth={2} aria-hidden="true" />
        Send Message
      </button>
    </form>
  )
}
