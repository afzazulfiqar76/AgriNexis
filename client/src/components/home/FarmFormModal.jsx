import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { InputField } from '@/components/forms/InputField'
import { FARM_TYPE_OPTIONS } from '@/services/farmsApi'

const EMPTY_FORM = {
  name: '',
  farmType: 'ROOFTOP',
  location: '',
  plantCount: 0,
  healthScore: 100,
}

function toFormValues(farm) {
  if (!farm) return EMPTY_FORM
  return {
    name: farm.name,
    farmType: farm.farmType,
    location: farm.location,
    plantCount: farm.plantCount,
    healthScore: farm.healthScore,
  }
}

/** Add / edit a farm. Pass `farm` to edit, leave it out to add a new one. */
export function FarmFormModal({ farm, onSave, onDelete, onClose }) {
  const [values, setValues] = useState(() => toFormValues(farm))
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const isEditing = Boolean(farm)

  function handleChange(event) {
    const { name, value } = event.target
    setValues((prev) => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    if (!values.name.trim()) {
      setError('Farm name is required.')
      return
    }
    const score = Number(values.healthScore)
    if (score < 0 || score > 100) {
      setError('Health score must be between 0 and 100.')
      return
    }
    setBusy(true)
    setError('')
    try {
      await onSave(values)
    } catch (err) {
      setError(err.message)
      setBusy(false)
    }
  }

  async function handleDelete() {
    if (!window.confirm('Delete this farm? This cannot be undone.')) return
    setBusy(true)
    try {
      await onDelete()
    } catch (err) {
      setError(err.message)
      setBusy(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="farm-modal-title"
    >
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-4 rounded-2xl bg-white p-6 shadow-xl"
      >
        <h3 id="farm-modal-title" className="text-lg font-bold text-gray-900">
          {isEditing ? 'Farm Details' : 'Add Farm'}
        </h3>

        <InputField
          label="FARM NAME"
          name="name"
          value={values.name}
          onChange={handleChange}
          placeholder="e.g. Rooftop Garden A"
        />

        <div className="w-full space-y-1.5">
          <label
            htmlFor="farmType"
            className="block text-xs font-bold tracking-wide text-gray-700"
          >
            FARM TYPE
          </label>
          <select
            id="farmType"
            name="farmType"
            value={values.farmType}
            onChange={handleChange}
            className="w-full rounded-xl border-0 bg-base-300 px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/30"
          >
            {FARM_TYPE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <InputField
          label="LOCATION"
          name="location"
          value={values.location}
          onChange={handleChange}
          placeholder="e.g. Lahore, DHA"
        />

        <div className="grid grid-cols-2 gap-4">
          <InputField
            label="PLANTS"
            name="plantCount"
            type="number"
            min="0"
            value={values.plantCount}
            onChange={handleChange}
          />
          <InputField
            label="HEALTH SCORE (0-100)"
            name="healthScore"
            type="number"
            min="0"
            max="100"
            value={values.healthScore}
            onChange={handleChange}
          />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <div className="flex items-center justify-between gap-3 pt-2">
          {isEditing ? (
            <Button type="button" variant="outline" onClick={handleDelete} disabled={busy}>
              Delete
            </Button>
          ) : (
            <span />
          )}
          <div className="flex gap-3">
            <Button type="button" variant="secondary" onClick={onClose} disabled={busy}>
              Cancel
            </Button>
            <Button type="submit" disabled={busy}>
              {busy ? 'Saving...' : 'Save'}
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}
