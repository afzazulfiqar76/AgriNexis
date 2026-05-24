import {
  BarChart3,
  Bell,
  BrainCircuit,
  Gauge,
  Headphones,
  LayoutDashboard,
  Settings,
  Sprout,
  Users,
  UsersRound,
} from 'lucide-react'
import { ADMIN_ROUTES } from '@/constants/adminRoutes'

export const ADMIN_NAV_ITEMS = [
  { label: 'Dashboard', to: ADMIN_ROUTES.DASHBOARD, icon: LayoutDashboard },
  { label: 'Users', to: ADMIN_ROUTES.USERS, icon: Users },
  { label: 'Farms', to: ADMIN_ROUTES.FARMS, icon: Sprout },
  { label: 'AI Doctor', to: ADMIN_ROUTES.AI_DOCTOR, icon: BrainCircuit },
  { label: 'IoT Monitoring', to: ADMIN_ROUTES.IOT, icon: Gauge },
  { label: 'Community', to: ADMIN_ROUTES.COMMUNITY, icon: UsersRound },
  { label: 'Analytics', to: ADMIN_ROUTES.ANALYTICS, icon: BarChart3 },
  { label: 'Notifications', to: ADMIN_ROUTES.NOTIFICATIONS, icon: Bell },
  { label: 'Support Center', to: ADMIN_ROUTES.SUPPORT, icon: Headphones },
  { label: 'Settings', to: ADMIN_ROUTES.SETTINGS, icon: Settings },
]

export const ADMIN_PAGE_TITLES = {
  [ADMIN_ROUTES.DASHBOARD]: { title: 'Dashboard', subtitle: 'Platform overview and system health' },
  [ADMIN_ROUTES.USERS]: { title: 'Users', subtitle: 'Manage accounts, roles, and access' },
  [ADMIN_ROUTES.FARMS]: { title: 'Farms', subtitle: 'Monitor urban farms and health scores' },
  [ADMIN_ROUTES.AI_DOCTOR]: { title: 'AI Doctor', subtitle: 'Plant diagnosis records and model activity' },
  [ADMIN_ROUTES.IOT]: { title: 'IoT Monitoring', subtitle: 'Sensor devices and live telemetry' },
  [ADMIN_ROUTES.COMMUNITY]: { title: 'Community', subtitle: 'Moderate posts and challenges' },
  [ADMIN_ROUTES.ANALYTICS]: { title: 'Analytics', subtitle: 'Usage trends and performance metrics' },
  [ADMIN_ROUTES.NOTIFICATIONS]: { title: 'Notifications', subtitle: 'Platform alerts and delivery logs' },
  [ADMIN_ROUTES.SUPPORT]: { title: 'Support Center', subtitle: 'Contact requests and help desk' },
  [ADMIN_ROUTES.SETTINGS]: { title: 'Settings', subtitle: 'Platform configuration and security' },
  [ADMIN_ROUTES.PROFILE]: {
    title: 'Manage My Account',
    subtitle: 'View and update your account details',
  },
}
