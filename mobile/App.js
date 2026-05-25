import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter'
import { StatusBar } from 'expo-status-bar'
import { View, ActivityIndicator, StyleSheet } from 'react-native'
import Toast from 'react-native-toast-message'
import { AuthProvider } from './src/context/AuthContext'
import { RootNavigator } from './src/navigation/RootNavigator'
import { colors } from './src/constants/theme'
import { toastConfig } from './src/components/ToastConfig'

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  })

  if (!fontsLoaded) {
    return (
      <View style={styles.splash}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    )
  }

  return (
    <AuthProvider>
      <StatusBar style="dark" />
      <RootNavigator />
      <Toast config={toastConfig} />
    </AuthProvider>
  )
}

const styles = StyleSheet.create({
  splash: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.base200,
  },
})
