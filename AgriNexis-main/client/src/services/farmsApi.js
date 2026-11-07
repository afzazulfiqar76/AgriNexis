import { apiRequest, parseJsonResponse } from '@/lib/apiClient'

export const FARM_TYPE_OPTIONS = [
  { value: 'ROOFTOP', label: 'Rooftop' },
  { value: 'BALCONY', label: 'Balcony' },
  { value: 'INDOOR', label: 'Indoor' },
  { value: 'COMMUNITY', label: 'Community' },
]

// Top border colour of the farm card, picked by farm type
const ACCENT_BY_TYPE = {
  ROOFTOP: 'border-t-primary',
  BALCONY: 'border-t-blue-500',
  INDOOR: 'border-t-purple-600',
  COMMUNITY: 'border-t-orange-500',
}

/** API (snake_case) → shape used by the existing FarmCard (camelCase) */
export function mapApiFarm(farm) {
  return {
    id: farm.id,
    name: farm.name,
    type: farm.farm_type_display,
    farmType: farm.farm_type,
    location: farm.location,
    plantCount: farm.plant_count,
    healthScore: farm.health_score,
    status: farm.status,
    accentClassName: ACCENT_BY_TYPE[farm.farm_type] ?? 'border-t-primary',
  }
}

/** Form values → API body */
function toApiBody(values) {
  return {
    name: values.name,
    farm_type: values.farmType,
    location: values.location,
    plant_count: Number(values.plantCount) || 0,
    health_score: Number(values.healthScore) || 0,
  }
}

export async function fetchFarms() {
  const response = await apiRequest('/api/farms/', { method: 'GET' })
  const data = await parseJsonResponse(response)
  return data.map(mapApiFarm)
}

export async function createFarm(values) {
  const response = await apiRequest('/api/farms/', {
    method: 'POST',
    body: toApiBody(values),
  })
  return mapApiFarm(await parseJsonResponse(response))
}

export async function updateFarm(id, values) {
  const response = await apiRequest(`/api/farms/${id}/`, {
    method: 'PATCH',
    body: toApiBody(values),
  })
  return mapApiFarm(await parseJsonResponse(response))
}

export async function deleteFarm(id) {
  const response = await apiRequest(`/api/farms/${id}/`, { method: 'DELETE' })
  await parseJsonResponse(response)
}

export async function fetchFarmSummary() {
  const response = await apiRequest('/api/farms/summary/', { method: 'GET' })
  return parseJsonResponse(response)
}

/** Full report for the "View Analytics" page (totals, by type, health bands...) */
export async function fetchFarmAnalytics() {
  const response = await apiRequest('/api/farms/analytics/', { method: 'GET' })
  return parseJsonResponse(response)
}
