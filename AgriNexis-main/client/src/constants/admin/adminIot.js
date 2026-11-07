export const INITIAL_ADMIN_IOT_DEVICES = [
  { id: 'esp-001', farm: 'Rooftop Garden A', owner: 'Ahmad Khan', status: 'online', lastReading: '2 min ago', sensors: 'Moisture, Temp, Humidity' },
  { id: 'esp-002', farm: 'Balcony Herbs', owner: 'Usman Ali', status: 'online', lastReading: '5 min ago', sensors: 'Moisture, Temp, Light' },
  { id: 'esp-003', farm: 'Rooftop Farm B', owner: 'Ahmad Khan', status: 'warning', lastReading: '45 min ago', sensors: 'Moisture, Temp' },
  { id: 'esp-004', farm: 'Community Plot 3', owner: 'Omar Sheikh', status: 'online', lastReading: '1 min ago', sensors: 'Full suite' },
  { id: 'esp-005', farm: 'Vertical Tower', owner: 'Imran Qureshi', status: 'offline', lastReading: '3 hr ago', sensors: 'Moisture, Humidity' },
]

export const IOT_SUMMARY_STATS = [
  { label: 'Online Devices', value: '612', variant: 'success' },
  { label: 'Offline Devices', value: '12', variant: 'danger' },
  { label: 'Warnings', value: '8', variant: 'warning' },
]
