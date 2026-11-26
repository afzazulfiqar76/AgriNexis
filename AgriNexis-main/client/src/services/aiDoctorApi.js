import { apiRequest, parseJsonResponse } from '@/lib/apiClient'

export async function predictPlantDisease({ image, plantName }) {
  const formData = new FormData()
  formData.append('image', image)
  if (plantName) formData.append('plant_name', plantName)

  const response = await apiRequest('/api/ai-doctor/predict/', {
    method: 'POST',
    body: formData,
  })
  return parseJsonResponse(response)
}

export async function fetchDiagnosisHistory() {
  const response = await apiRequest('/api/ai-doctor/history/', { method: 'GET' })
  return parseJsonResponse(response)
}

export async function fetchDiagnosisDetail(id) {
  const response = await apiRequest(`/api/ai-doctor/history/${id}/`, { method: 'GET' })
  return parseJsonResponse(response)
}

export async function fetchDiseaseInformation() {
  const response = await apiRequest('/api/ai-doctor/diseases/', { method: 'GET' })
  return parseJsonResponse(response)
}
