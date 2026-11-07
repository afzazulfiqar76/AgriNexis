import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Home, BrainCircuit, Gauge, Users, User } from 'lucide-react-native'
import { colors, fontFamily } from '../constants/theme'
import { HomeScreen } from '../screens/main/HomeScreen'
import { AiDoctorScreen } from '../screens/main/AiDoctorScreen'
import { IotSensorsScreen } from '../screens/main/IotSensorsScreen'
import { CommunityScreen } from '../screens/main/CommunityScreen'
import { ProfileScreen } from '../screens/main/ProfileScreen'

const Tab = createBottomTabNavigator()

const TAB_ICONS = {
  Home,
  AiDoctor: BrainCircuit,
  IotSensors: Gauge,
  Community: Users,
  Profile: User,
}

export function AppTabs() {
  const insets = useSafeAreaInsets()
  const bottomPad = Math.max(insets.bottom, 8)
  const tabHeight = 52 + bottomPad

  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        const Icon = TAB_ICONS[route.name] ?? Home
        return {
          headerShown: false,
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.textMuted,
          tabBarLabelStyle: {
            fontFamily: fontFamily.medium,
            fontSize: 11,
            marginBottom: 2,
          },
          tabBarStyle: {
            backgroundColor: colors.base100,
            borderTopColor: colors.border,
            borderTopWidth: 1,
            paddingTop: 6,
            paddingBottom: bottomPad,
            height: tabHeight,
          },
          tabBarItemStyle: { paddingTop: 2 },
          tabBarIcon: ({ color, focused }) => (
            <Icon size={22} color={color} strokeWidth={focused ? 2.4 : 2} />
          ),
        }
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
      <Tab.Screen name="AiDoctor" component={AiDoctorScreen} options={{ title: 'AI Doctor' }} />
      <Tab.Screen name="IotSensors" component={IotSensorsScreen} options={{ title: 'IoT' }} />
      <Tab.Screen name="Community" component={CommunityScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  )
}
