import { StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { useAuth } from '../context/AuthContext'
import { LoadingOverlay } from '../components/LoadingOverlay'
import { AuthStack } from './AuthStack'
import { AppStack } from './AppStack'

export function RootNavigator() {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return <LoadingOverlay />
  }

  return (
    <GestureHandlerRootView style={styles.root}>
      <NavigationContainer>
        {isAuthenticated ? <AppStack /> : <AuthStack />}
      </NavigationContainer>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  root: { flex: 1 },
})
