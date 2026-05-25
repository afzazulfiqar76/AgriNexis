import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { colors } from '../constants/theme'
import { AdminDashboardScreen } from '../screens/admin/AdminDashboardScreen'
import { AdminUsersScreen } from '../screens/admin/AdminUsersScreen'

const Stack = createNativeStackNavigator()

export function AdminStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.base100 },
        headerTintColor: colors.text,
        headerTitleStyle: { fontWeight: '600' },
      }}
    >
      <Stack.Screen
        name="AdminDashboard"
        component={AdminDashboardScreen}
        options={{ title: 'Admin Dashboard' }}
      />
      <Stack.Screen name="AdminUsers" component={AdminUsersScreen} options={{ title: 'Users' }} />
    </Stack.Navigator>
  )
}
