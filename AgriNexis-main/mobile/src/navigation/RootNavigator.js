import { useCallback, useRef, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { useAuth } from '../context/AuthContext'
import { ChatWidgetProvider } from '../context/ChatWidgetContext'
import { LoadingOverlay } from '../components/LoadingOverlay'
import { ChatWidget } from '../components/chat/ChatWidget'
import { AuthStack } from './AuthStack'
import { AppStack } from './AppStack'
import { ROUTES } from '../constants/routes'

const TAB_ROUTES = new Set([
  ROUTES.HOME,
  ROUTES.AI_DOCTOR,
  ROUTES.IOT_SENSORS,
  ROUTES.COMMUNITY,
  ROUTES.PROFILE,
])

function getActiveRouteName(state) {
  if (!state) return null
  const route = state.routes[state.index ?? 0]
  if (route?.state) return getActiveRouteName(route.state)
  return route?.name ?? null
}

function shouldHideChat(routeName, rootState) {
  if (!routeName) return false
  if (routeName === ROUTES.SIGN_IN || routeName === ROUTES.SIGN_UP) return true
  if (routeName === ROUTES.ADMIN || String(routeName).startsWith('Admin')) return true
  const top = rootState?.routes?.[rootState.index ?? 0]
  if (top?.name === ROUTES.ADMIN) return true
  return false
}

export function RootNavigator() {
  const { isAuthenticated, isLoading } = useAuth()
  const navigationRef = useRef(null)
  const [routeName, setRouteName] = useState(null)
  const [navState, setNavState] = useState(null)
  const [navReady, setNavReady] = useState(false)

  const onReady = useCallback(() => {
    const state = navigationRef.current?.getRootState?.()
    setNavState(state ?? null)
    setRouteName(getActiveRouteName(state))
    setNavReady(true)
  }, [])

  const onStateChange = useCallback((state) => {
    setNavState(state ?? null)
    setRouteName(getActiveRouteName(state))
  }, [])

  if (isLoading) {
    return <LoadingOverlay />
  }

  const hidden = shouldHideChat(routeName, navState)
  const liftForTabs = TAB_ROUTES.has(routeName)

  return (
    <ChatWidgetProvider>
      <GestureHandlerRootView style={styles.root}>
        <View style={styles.root}>
          <NavigationContainer
            ref={navigationRef}
            onReady={onReady}
            onStateChange={onStateChange}
          >
            {isAuthenticated ? <AppStack /> : <AuthStack />}
          </NavigationContainer>
          {navReady ? (
            <ChatWidget
              hidden={hidden}
              navigationRef={navigationRef}
              liftForTabs={liftForTabs}
            />
          ) : null}
        </View>
      </GestureHandlerRootView>
    </ChatWidgetProvider>
  )
}

const styles = StyleSheet.create({
  root: { flex: 1 },
})
