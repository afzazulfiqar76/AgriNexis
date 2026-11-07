export const DOCUMENTATION_PAGE = {
  label: 'Product Documentation',
  title: 'AgriNexis Documentation',
  subtitle:
    'Learn how our AI-powered urban farming ecosystem helps you monitor crops, automate irrigation, and grow sustainably in limited urban spaces.',
  searchPlaceholder: 'Search documentation…',
  emptySearch: 'No sections match your search. Try different keywords.',
}

export const DOCUMENTATION_SECTIONS = [
  {
    id: 'introduction',
    title: 'Introduction',
    icon: 'sprout',
    summary: 'Overview of AgriNexis and the urban farming challenge in Pakistan.',
    paragraphs: [
      'AgriNexis is an AI-powered urban farming ecosystem designed for rooftop, balcony, and indoor growers in metropolitan areas such as Lahore. As agricultural land shrinks and demand for fresh, local produce rises, urban residents need smarter tools than manual observation and generic advice.',
      'The platform combines Artificial Intelligence, Internet of Things (IoT) sensors, cloud analytics, and community collaboration to turn small-scale farming into an efficient, data-driven practice. The current release supports a curated set of crops and plants suited to Lahore, with a roadmap toward dynamic, location-aware recommendations.',
    ],
    bullets: [
      'Target users: urban farmers, home gardeners, and beginners with limited space',
      'Focus: real-time monitoring, early disease detection, and resource optimization',
      'Vision: accessible, sustainable farming for smart-city environments',
    ],
    highlights: [
      {
        title: 'Platform goal',
        text: 'Transform urban farming through intelligent automation, personalized insights, and measurable sustainability metrics.',
      },
    ],
  },
  {
    id: 'features',
    title: 'Features',
    icon: 'sparkles',
    summary: 'Core capabilities across the AgriNexis web and mobile experience.',
    paragraphs: [
      'AgriNexis delivers an integrated suite of tools so growers can manage farms, receive alerts, and track performance from a single dashboard.',
    ],
    bullets: [
      'Secure user authentication and multi-farm management',
      'Crop tracking, activity logging, and growth indicators',
      'AI Plant Doctor with image-based disease prediction',
      'Smart irrigation recommendations driven by sensors and weather',
      'IoT live monitoring for soil moisture, temperature, humidity, and light',
      'Weather integration and adaptive farming guidance',
      'Smart alerts and push-style notifications for critical events',
      'Sustainability tracking: water usage, carbon footprint, and Eco-Score',
      'Community feed, eco-challenges, and leaderboards',
      'Cloud-based storage and analytics for historical trends',
    ],
    highlights: [],
  },
  {
    id: 'ai-doctor',
    title: 'AI Doctor',
    icon: 'brain',
    summary: 'CNN-based plant disease detection and health scoring.',
    paragraphs: [
      'The AI Plant Doctor lets users upload photos of affected plants. A convolutional neural network (CNN) analyzes the image to predict diseases, return a confidence score, and suggest remedies. Results are saved to crop history for future reference.',
      'Each plant receives a health score from 0 to 100, updated after every analysis. Color-coded bands help you act quickly: red (0–40) indicates critical attention, yellow (41–70) moderate concern, and green (71–100) healthy growth.',
    ],
    bullets: [
      'Upload from camera or gallery (PNG/JPG)',
      'Disease name, confidence score, and remedy suggestions',
      'Preventive alerts when environmental patterns suggest elevated disease risk',
    ],
    highlights: [
      {
        title: 'Health score bands',
        text: 'Red 0–40 · Yellow 41–70 · Green 71–100 — visible on diagnosis cards and dashboard summaries.',
      },
    ],
  },
  {
    id: 'iot-monitoring',
    title: 'IoT Monitoring',
    icon: 'gauge',
    summary: 'Real-time environmental data from connected sensors.',
    paragraphs: [
      'IoT hardware (Arduino with DHT22, soil moisture, and light sensors) streams readings to the AgriNexis cloud. The IoT Sensors dashboard displays live values with status badges and refreshes approximately every 60 seconds.',
      'When readings fall outside safe thresholds for a crop type, the system triggers anomaly alerts so you can respond before plant health declines.',
    ],
    bullets: [
      'Soil moisture, temperature, humidity, and light intensity',
      'Live data indicators and historical trend views (planned)',
      'Simulated sensor mode for testing without physical hardware',
    ],
    highlights: [],
  },
  {
    id: 'community-platform',
    title: 'Community Platform',
    icon: 'users',
    summary: 'Share knowledge, join challenges, and learn from other growers.',
    paragraphs: [
      'The Community module connects urban farmers through a social feed, sustainability challenges, and leaderboards. Members post tips and photos, participate in eco-challenges such as water conservation goals, and compare progress with peers.',
    ],
    bullets: [
      'Community feed with likes, comments, and sharing',
      'Active challenges with progress tracking and milestones',
      'Leaderboard rankings and achievement-style engagement',
      'Expert-verified content roadmap for trusted farming advice',
    ],
    highlights: [],
  },
  {
    id: 'smart-irrigation',
    title: 'Smart Irrigation',
    icon: 'droplets',
    summary: 'AI-assisted watering schedules based on sensors and weather.',
    paragraphs: [
      'Smart Irrigation analyzes soil moisture, plant type, and forecasted weather to recommend optimal watering times. Schedules update daily to prevent overwatering and underwatering, and users can accept or adjust recommendations before applying them.',
    ],
    bullets: [
      'Daily schedule recommendations per farm and crop',
      'Integration with IoT moisture readings and OpenWeatherMap data',
      'Reminders when soil moisture drops below crop-specific thresholds',
    ],
    highlights: [],
  },
  {
    id: 'dashboard-analytics',
    title: 'Dashboard Analytics',
    icon: 'layout',
    summary: 'At-a-glance farm health, sustainability, and performance metrics.',
    paragraphs: [
      'The dashboard aggregates farm count, plant totals, Eco-Score, and AI diagnosis activity. Urban farm cards show per-plot health scores, locations, and quick actions. Sustainability modules track water and fertilizer usage plus estimated carbon footprint over time.',
    ],
    bullets: [
      'Stat cards with animated progress for Eco-Score and health metrics',
      'My Urban Farms panel with multi-plot management',
      'Weather forecast and smart alerts on the home insights section',
      'Benchmarking against community averages (planned)',
    ],
    highlights: [],
  },
  {
    id: 'system-architecture',
    title: 'System Architecture',
    icon: 'layers',
    summary: 'How AgriNexis components connect across clients, cloud, and devices.',
    paragraphs: [
      'AgriNexis follows a modular architecture: users interact through a React web client (this site) and a planned Flutter mobile app. A Python backend API handles business logic, while Firebase provides authentication, real-time database, and cloud storage.',
      'AI models run disease prediction on uploaded images. IoT devices publish sensor data to the cloud. OpenWeatherMap supplies weather context for irrigation and alert modules.',
    ],
    bullets: [
      'Clients: React (web), Flutter (mobile — in development)',
      'Backend: Python (FastAPI/Django) with REST APIs',
      'Data: Firebase Authentication, Firestore/Realtime Database',
      'AI: CNN models for plant disease classification',
      'IoT: Arduino + environmental sensors',
      'External: OpenWeatherMap API for forecasts and alerts',
    ],
    highlights: [
      {
        title: 'Data flow',
        text: 'Sensors and user actions → cloud storage → analytics & AI → personalized recommendations and notifications on all connected devices.',
      },
    ],
  },
  {
    id: 'future-scope',
    title: 'Future Scope',
    icon: 'rocket',
    summary: 'Roadmap for scalability, new regions, and enhanced intelligence.',
    paragraphs: [
      'The current system operates as a static model focused on Lahore-suitable crops. Future releases will expand into a dynamic platform supporting additional cities, crop catalogs, and continuously improving AI models trained on regional data.',
    ],
    bullets: [
      'Dynamic crop and location databases beyond Lahore',
      'Enhanced predictive analytics for yield and harvest planning',
      'Deeper integration with marketplace and expert consultation services',
      'Expanded admin tooling for model updates and platform health monitoring',
      'Native mobile feature parity and offline-capable field workflows',
    ],
    highlights: [],
  },
]
