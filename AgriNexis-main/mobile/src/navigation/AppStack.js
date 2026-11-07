import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { colors, fontFamily } from '../constants/theme'
import { ROUTES } from '../constants/routes'
import { publicHeaderOptions } from './publicScreenOptions'
import { AppTabs } from './AppTabs'
import { AdminDrawerNavigator } from './AdminDrawerNavigator'
import { DashboardScreen } from '../screens/main/DashboardScreen'
import { NotificationsScreen } from '../screens/main/NotificationsScreen'
import { ContactScreen } from '../screens/public/ContactScreen'
import { DocumentationScreen } from '../screens/public/DocumentationScreen'
import { PrivacyPolicyScreen } from '../screens/public/PrivacyPolicyScreen'
import { FaqsScreen } from '../screens/public/FaqsScreen'

const Stack = createNativeStackNavigator()

const stackHeader = {
  headerShown: true,
  headerStyle: { backgroundColor: colors.base100 },
  headerTintColor: colors.text,
  headerTitleStyle: { fontFamily: fontFamily.semibold },
}

export function AppStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tabs" component={AppTabs} />
      <Stack.Screen name={ROUTES.DASHBOARD} component={DashboardScreen} options={{ ...stackHeader, title: 'Dashboard' }} />
      <Stack.Screen name={ROUTES.NOTIFICATIONS} component={NotificationsScreen} options={{ ...stackHeader, title: 'Notifications' }} />
      <Stack.Screen name={ROUTES.CONTACT} component={ContactScreen} options={{ ...publicHeaderOptions, title: 'Contact' }} />
      <Stack.Screen name={ROUTES.DOCUMENTATION} component={DocumentationScreen} options={{ ...publicHeaderOptions, title: 'Documentation' }} />
      <Stack.Screen name={ROUTES.PRIVACY_POLICY} component={PrivacyPolicyScreen} options={{ ...publicHeaderOptions, title: 'Privacy Policy' }} />
      <Stack.Screen name={ROUTES.FAQS} component={FaqsScreen} options={{ ...publicHeaderOptions, title: 'FAQs' }} />
      <Stack.Screen name="Admin" component={AdminDrawerNavigator} options={{ headerShown: false, presentation: 'modal' }} />
    </Stack.Navigator>
  )
}
