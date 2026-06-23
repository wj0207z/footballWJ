import { Ionicons } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context'; // The new notch protection engine!

import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';
import SettingScreen from './SettingScreen';
import { ThemeProvider } from './ThemeContext';

const Tab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();

// The custom animated icon component for your tabs
const TabIcon = ({ name, focused, color, size }: any) => {
  const scaleValue = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.spring(scaleValue, {
      toValue: focused ? 1.2 : 1,
      friction: 4,
      useNativeDriver: true,
    }).start();
  }, [focused]);

  return (
    <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
      <Ionicons name={name} size={size} color={color} />
    </Animated.View>
  );
};

// The stack holding your squad list and individual player profiles
function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Current Squad'}} />
      <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Player Profile'}} />
    </Stack.Navigator>
  );
}

// The main application wrapper
export default function App() {
  return (
    // SafeAreaProvider wraps EVERYTHING to ensure notch calculations work app-wide
    <SafeAreaProvider>
      <ThemeProvider>
        <NavigationContainer>
          <Tab.Navigator
            tabBarPosition="bottom" // Forces the material tabs to act like bottom tabs
            screenOptions={({ route }) => ({
              swipeEnabled: true, // Enables the buttery smooth screen swiping
              tabBarIcon: ({ focused, color }) => {
                let iconName: any = 'football';
                
                // Swapping between filled and outlined icons for that native feel
                if (route.name === 'Squad') {
                  iconName = focused ? 'people' : 'people-outline';
                } else if (route.name === 'Settings') {
                  iconName = focused ? 'settings' : 'settings-outline';
                }
                
                return <TabIcon name={iconName} focused={focused} color={color} size={24} />;
              },
              tabBarActiveTintColor: '#D50032', // Manchester United Red
              tabBarInactiveTintColor: 'gray',
              tabBarIndicatorStyle: {
                backgroundColor: '#D50032',
                height: 3,
              },
              tabBarStyle: {
                paddingBottom: 5,
                paddingTop: 5,
              },
              tabBarShowIcon: true,
            })}
          >
            <Tab.Screen name="Squad" component={HomeStack} />
            <Tab.Screen name="Settings" component={SettingScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}