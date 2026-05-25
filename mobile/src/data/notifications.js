// UI mock — replace with API when server exposes /api/notifications

export const NOTIFICATIONS = [
  {
    id: 'ai-diagnosis',
    title: 'New AI diagnosis completed',
    description: 'Tomato plant analysis is ready to review',
    timeAgo: '5 mins ago',
    variant: 'info',
    read: false,
  },
  {
    id: 'soil-moisture',
    title: 'Soil moisture alert triggered',
    description: 'Rooftop Garden A moisture below 30%',
    timeAgo: '12 mins ago',
    variant: 'warning',
    read: false,
  },
  {
    id: 'challenge',
    title: 'Community challenge updated',
    description: 'Water Conservation Challenge progress at 75%',
    timeAgo: '1 hour ago',
    variant: 'success',
    read: false,
  },
  {
    id: 'irrigation',
    title: 'Irrigation schedule reminder',
    description: 'Smart irrigation scheduled in 30 minutes',
    timeAgo: '2 hours ago',
    variant: 'info',
    read: true,
  },
]
