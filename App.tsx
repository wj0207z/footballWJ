import { Ionicons } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useRef, useState } from 'react';
import { Animated } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import HomeScreen from './HomeScreen';
import LoginScreen from './LoginScreen';
import ProfileScreen from './ProfileScreen';
import SettingsScreen from './SettingsScreen';
import SignUpScreen from './SignUpScreen';
import { supabase } from './supabase';
import { ThemeProvider } from './ThemeContext';

const Tab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();

const TabIcon = ({ name, focused, color, size }: any) => {
  const scaleValue = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    Animated.spring(scaleValue, { toValue: focused ? 1.2 : 1, friction: 4, useNativeDriver: true }).start();
  }, [focused]);
  return (
    <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
      <Ionicons name={name} size={size} color={color} />
    </Animated.View>
  );
};

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Current Squad' }} />
      <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Player Profile' }} />
    </Stack.Navigator>
  );
}

export default function App() {
  const [session, setSession] = useState<any>(null);
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => setSession(session));
    return () => subscription.unsubscribe();
  }, []);

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <NavigationContainer>
          {session ? (
            <Tab.Navigator tabBarPosition="bottom" screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color }) => {
                  const iconName = route.name === 'Squad' ? (focused ? 'people' : 'people-outline') : (focused ? 'settings' : 'settings-outline');
                  return <TabIcon name={iconName} focused={focused} color={color} size={24} />;
                },
                tabBarActiveTintColor: '#D50032',
              })}>
              <Tab.Screen name="Squad" component={HomeStack} />
              <Tab.Screen name="Settings" component={SettingsScreen} />
            </Tab.Navigator>
          ) : (
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="SignUp" component={SignUpScreen} />
            </Stack.Navigator>
          )}
        </NavigationContainer>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}