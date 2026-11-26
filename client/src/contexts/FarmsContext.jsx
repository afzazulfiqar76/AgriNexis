import { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FarmFormModal } from '@/components/home/FarmFormModal'
import { ROUTES } from '@/constants/routes'
import { useAuth } from '@/contexts/AuthContext'
import { showError, showSuccess } from '@/lib/toast'
import {
  createFarm,
  deleteFarm,
  fetchFarmSummary,
  fetchFarms,
  updateFarm,
} from '@/services/farmsApi'

/**
 * Keeps the user's farms in one place so the dashboard banner ("Add New Farm"),
 * the stat cards and the "My Urban Farms" list all share the same data and the
 * same add / edit form.
 */
const FarmsContext = createContext(null)

export function FarmsProvider({ children }) {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const [farms, setFarms] = useState([])
  const [summary, setSummary] = useState(null)
  const [loading, setLoading] = useState(true)

  // Changing reloadKey makes the effect below fetch everything again
  const [reloadKey, setReloadKey] = useState(0)

  // The add / edit form: farm = null means "add a new farm"
  const [modal, setModal] = useState({ open: false, farm: null })

  useEffect(() => {
    if (!isAuthenticated) return
    let cancelled = false

    Promise.all([fetchFarms(), fetchFarmSummary()])
      .then(([farmList, totals]) => {
        if (cancelled) return
        setFarms(farmList)
        setSummary(totals)
      })
      .catch((err) => {
        if (!cancelled) showError(err.message)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [isAuthenticated, reloadKey])

  function openAdd() {
    if (!isAuthenticated) {
      navigate(ROUTES.SIGN_IN)
      return
    }
    setModal({ open: true, farm: null })
  }

  function openEdit(farm) {
    setModal({ open: true, farm })
  }

  function closeModal() {
    setModal({ open: false, farm: null })
  }

  async function handleSave(values) {
    if (modal.farm) {
      await updateFarm(modal.farm.id, values)
      showSuccess('Farm updated')
    } else {
      await createFarm(values)
      showSuccess('Farm added')
    }
    closeModal()
    setReloadKey((key) => key + 1)
  }

  async function handleDelete() {
    await deleteFarm(modal.farm.id)
    showSuccess('Farm deleted')
    closeModal()
    setReloadKey((key) => key + 1)
  }

  const value = { farms, summary, loading, openAdd, openEdit }

  return (
    <FarmsContext.Provider value={value}>
      {children}
      {modal.open && (
        <FarmFormModal
          farm={modal.farm}
          onSave={handleSave}
          onDelete={handleDelete}
          onClose={closeModal}
        />
      )}
    </FarmsContext.Provider>
  )
}

export function useFarms() {
  const context = useContext(FarmsContext)
  if (!context) {
    throw new Error('useFarms must be used within FarmsProvider')
  }
  return context
}
