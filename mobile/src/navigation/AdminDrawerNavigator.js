import { createDrawerNavigator } from '@react-navigation/drawer'
import { AdminDrawerContent } from '../components/admin/AdminDrawerContent'
import { colors, fontFamily } from '../constants/theme'
import { ADMIN_ROUTES } from '../constants/adminRoutes'
import { AdminDashboardScreen } from '../screens/admin/AdminDashboardScreen'
import { AdminUsersScreen } from '../screens/admin/AdminUsersScreen'
import { AdminFarmsScreen } from '../screens/admin/AdminFarmsScreen'
import { AdminAiDoctorScreen } from '../screens/admin/AdminAiDoctorScreen'
import { AdminIotMonitoringScreen } from '../screens/admin/AdminIotMonitoringScreen'
import { AdminCommunityScreen } from '../screens/admin/AdminCommunityScreen'
import { AdminAnalyticsScreen } from '../screens/admin/AdminAnalyticsScreen'
import { AdminNotificationsScreen } from '../screens/admin/AdminNotificationsScreen'
import { AdminSupportScreen } from '../screens/admin/AdminSupportScreen'
import { AdminSettingsScreen } from '../screens/admin/AdminSettingsScreen'
import { AdminProfileScreen } from '../screens/admin/AdminProfileScreen'

const Drawer = createDrawerNavigator()

export function AdminDrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <AdminDrawerContent {...props} />}
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: colors.base100 },
        headerTintColor: colors.text,
        headerTitleStyle: { fontFamily: fontFamily.semibold },
        drawerStyle: { width: 280, backgroundColor: colors.base100 },
      }}
    >
      <Drawer.Screen name={ADMIN_ROUTES.DASHBOARD} component={AdminDashboardScreen} options={{ title: 'Dashboard' }} />
      <Drawer.Screen name={ADMIN_ROUTES.USERS} component={AdminUsersScreen} options={{ title: 'Users' }} />
      <Drawer.Screen name={ADMIN_ROUTES.FARMS} component={AdminFarmsScreen} options={{ title: 'Farms' }} />
      <Drawer.Screen name={ADMIN_ROUTES.AI_DOCTOR} component={AdminAiDoctorScreen} options={{ title: 'AI Doctor' }} />
      <Drawer.Screen name={ADMIN_ROUTES.IOT} component={AdminIotMonitoringScreen} options={{ title: 'IoT Monitoring' }} />
      <Drawer.Screen name={ADMIN_ROUTES.COMMUNITY} component={AdminCommunityScreen} options={{ title: 'Community' }} />
      <Drawer.Screen name={ADMIN_ROUTES.ANALYTICS} component={AdminAnalyticsScreen} options={{ title: 'Analytics' }} />
      <Drawer.Screen name={ADMIN_ROUTES.NOTIFICATIONS} component={AdminNotificationsScreen} options={{ title: 'Notifications' }} />
      <Drawer.Screen name={ADMIN_ROUTES.SUPPORT} component={AdminSupportScreen} options={{ title: 'Support' }} />
      <Drawer.Screen name={ADMIN_ROUTES.SETTINGS} component={AdminSettingsScreen} options={{ title: 'Settings' }} />
      <Drawer.Screen name={ADMIN_ROUTES.PROFILE} component={AdminProfileScreen} options={{ title: 'My Account' }} />
    </Drawer.Navigator>
  )
}
