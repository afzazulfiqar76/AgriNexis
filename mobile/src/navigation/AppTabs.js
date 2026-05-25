import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
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
  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        const Icon = TAB_ICONS[route.name] ?? Home
        return {
          headerShown: false,
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.textMuted,
          tabBarLabelStyle: { fontFamily: fontFamily.medium, fontSize: 11 },
          tabBarStyle: {
            backgroundColor: colors.base100,
            borderTopColor: colors.border,
            paddingTop: 4,
            height: 60,
          },
          tabBarIcon: ({ color, size }) => <Icon size={size} color={color} strokeWidth={2} />,
        }
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="AiDoctor" component={AiDoctorScreen} options={{ title: 'AI Doctor' }} />
      <Tab.Screen name="IotSensors" component={IotSensorsScreen} options={{ title: 'IoT' }} />
      <Tab.Screen name="Community" component={CommunityScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  )
}
