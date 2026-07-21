export const NOTIFICATIONS = [
  {
    id: 'ai-diagnosis',
    title: 'New AI diagnosis completed',
    description: 'Tomato plant analysis is ready to review',
    detail: 'Tomato plant analysis is ready to review',
    timeAgo: '5 mins ago',
    variant: 'info',
    icon: 'brain',
    read: false,
  },
  {
    id: 'soil-moisture',
    title: 'Soil moisture alert triggered',
    description: 'Rooftop Garden A moisture below 30%',
    detail: 'Rooftop Garden A moisture below 30%',
    timeAgo: '12 mins ago',
    variant: 'warning',
    icon: 'droplets',
    read: false,
  },
  {
    id: 'challenge',
    title: 'Community challenge updated',
    description: 'Water Conservation Challenge progress at 75%',
    detail: 'Water Conservation Challenge progress at 75%',
    timeAgo: '1 hour ago',
    variant: 'success',
    icon: 'trending',
    read: false,
  },
  {
    id: 'irrigation',
    title: 'Irrigation schedule reminder',
    description: 'Smart irrigation scheduled in 30 minutes',
    detail: 'Smart irrigation scheduled in 30 minutes',
    timeAgo: '2 hours ago',
    variant: 'info',
    icon: 'clock',
    read: true,
  },
]

export { NOTIFICATIONS as INITIAL_NOTIFICATIONS }
