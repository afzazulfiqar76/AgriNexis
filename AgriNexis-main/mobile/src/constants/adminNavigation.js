import { ADMIN_ROUTES } from './adminRoutes'

export const ADMIN_NAV_ITEMS = [
  { label: 'Dashboard', route: ADMIN_ROUTES.DASHBOARD, icon: 'layout-dashboard' },
  { label: 'Users', route: ADMIN_ROUTES.USERS, icon: 'users' },
  { label: 'Farms', route: ADMIN_ROUTES.FARMS, icon: 'sprout' },
  { label: 'AI Doctor', route: ADMIN_ROUTES.AI_DOCTOR, icon: 'brain-circuit' },
  { label: 'IoT Monitoring', route: ADMIN_ROUTES.IOT, icon: 'gauge' },
  { label: 'Community', route: ADMIN_ROUTES.COMMUNITY, icon: 'users-round' },
  { label: 'Analytics', route: ADMIN_ROUTES.ANALYTICS, icon: 'bar-chart-3' },
  { label: 'Notifications', route: ADMIN_ROUTES.NOTIFICATIONS, icon: 'bell' },
  { label: 'Support Center', route: ADMIN_ROUTES.SUPPORT, icon: 'headphones' },
  { label: 'Settings', route: ADMIN_ROUTES.SETTINGS, icon: 'settings' },
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
