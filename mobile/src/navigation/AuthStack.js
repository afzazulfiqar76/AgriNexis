import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { LoginScreen } from '../screens/auth/LoginScreen'
import { SignupScreen } from '../screens/auth/SignupScreen'
import { ContactScreen } from '../screens/public/ContactScreen'
import { DocumentationScreen } from '../screens/public/DocumentationScreen'
import { PrivacyPolicyScreen } from '../screens/public/PrivacyPolicyScreen'
import { FaqsScreen } from '../screens/public/FaqsScreen'
import { ROUTES } from '../constants/routes'
import { publicHeaderOptions } from './publicScreenOptions'

const Stack = createNativeStackNavigator()

export function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={ROUTES.SIGN_IN} component={LoginScreen} />
      <Stack.Screen name={ROUTES.SIGN_UP} component={SignupScreen} />
      <Stack.Screen name={ROUTES.CONTACT} component={ContactScreen} options={{ ...publicHeaderOptions, title: 'Contact' }} />
      <Stack.Screen name={ROUTES.DOCUMENTATION} component={DocumentationScreen} options={{ ...publicHeaderOptions, title: 'Documentation' }} />
      <Stack.Screen name={ROUTES.PRIVACY_POLICY} component={PrivacyPolicyScreen} options={{ ...publicHeaderOptions, title: 'Privacy' }} />
      <Stack.Screen name={ROUTES.FAQS} component={FaqsScreen} options={{ ...publicHeaderOptions, title: 'FAQs' }} />
    </Stack.Navigator>
  )
}
