// UI mock — replace with API when server exposes /api/dashboard

export const HOME_STATS = [
  { id: 'active-farms', label: 'Active Farms', value: '3', trend: '+2 this month', icon: 'sprout' },
  { id: 'total-plants', label: 'Total Plants', value: '24', trend: 'Health 87/100', icon: 'sprout' },
  { id: 'eco-score', label: 'Eco Score', value: '92', trend: 'Excellent', icon: 'chart' },
  { id: 'water-saved', label: 'Water Saved', value: '156L', trend: 'This month', icon: 'droplets' },
]

export const QUICK_LINKS = [
  { id: 'dashboard', label: 'My Dashboard', route: 'Dashboard' },
  { id: 'notifications', label: 'Notifications', route: 'Notifications' },
]
