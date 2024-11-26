import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';

import { useAuthStore } from '../stores/AuthState';
import TabStack from "./TabNavigator.tsx";

const Stack = createStackNavigator();

const AppNavigator = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
      <Stack.Navigator    screenOptions={({ route }) => ({
          headerShown: false,
      })}>
        {isAuthenticated ? (
          <Stack.Screen name="Home" component={TabStack} />
        ) : (
          <Stack.Screen name="Login" component={LoginScreen} />
        )}
      </Stack.Navigator>
  );
};

export default AppNavigator;
