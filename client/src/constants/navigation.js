import { BrainCircuit, Gauge, Home, Users } from 'lucide-react'
import { ROUTES } from '@/constants/routes'

export const NAV_ITEMS = [
  { label: 'Dashboard', to: ROUTES.HOME, icon: Home },
  { label: 'AI Doctor', to: ROUTES.AI_DOCTOR, icon: BrainCircuit },
  { label: 'IoT Sensors', to: ROUTES.IOT_SENSORS, icon: Gauge },
  { label: 'Community', to: ROUTES.COMMUNITY, icon: Users },
]

export const MOCK_USER = {
  name: 'Admin User',
  role: 'System Administrator',
  initials: 'AU',
}

export const NOTIFICATION_COUNT = 3
