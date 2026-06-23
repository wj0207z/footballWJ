import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Context Import
import { ThemeProvider } from './ThemeContext';

// Screen Imports
import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';
import SettingsScreen from './SettingScreen'; // Make sure the filename perfectly matches this!

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// This stack handles the transition from list -> profile screen
function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Current Squad'}} />
      <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Player Profile'}} />
    </Stack.Navigator>
  );
}

// ONLY ONE App Function!
export default function App() {
  return (
    // ThemeProvider wraps everything
    <ThemeProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName: any = 'football'; // Default icon
              if (route.name === 'Squad') iconName = 'people';
              if (route.name === 'Settings') iconName = 'settings';
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'red',
            tabBarInactiveTintColor: 'gray',
          })}
        >
          {/* The first tab uses our Stack */}
          <Tab.Screen name="Squad" component={HomeStack} options={{ headerShown: false }} />
          
          {/* The Settings Tab */}
          <Tab.Screen name="Settings" component={SettingsScreen} />

        </Tab.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}