export default {
  expo: {
    name: 'AgriNexis',
    slug: 'agrinexis',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'light',
    splash: {
      image: './assets/icon.png',
      resizeMode: 'contain',
      backgroundColor: '#f0fdf4',
    },
    ios: {
      supportsTablet: true,
    },
    android: {
      usesCleartextTraffic: true,
      adaptiveIcon: {
        backgroundColor: '#00a36c',
        foregroundImage: './assets/android-icon-foreground.png',
      },
    },
    web: {
      favicon: './assets/favicon.png',
    },
    extra: {
      apiBaseUrl: process.env.EXPO_PUBLIC_API_BASE_URL ?? 'http://localhost:8000',
    },
    plugins: ['expo-font'],
  },
}
