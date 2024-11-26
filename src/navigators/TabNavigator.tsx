import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation, Button, Card, Icon, IconButton, useTheme } from 'react-native-paper';
import ShowCaseScreen from "../screens/ShowCaseScreen.tsx";
import SettingsScreen from "../screens/SettingsScreen.tsx";
import { theme } from "../styles/theme.ts";
import HomeScreen from "../screens/HomeScreen.tsx";
import AddOrder from "../screens/AddOrderScreen.tsx";

const Tab = createBottomTabNavigator(

);


function MyTabBar({ state, descriptors, navigation }) {

  return (
    <View style={{ flexDirection: 'row', backgroundColor: 'white', height: 80, padding: 8 }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel !== undefined
          ? options.tabBarLabel
          : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        // Define icons for each tab based on the route name
        let iconName  = 'sale';
        if (route.name === 'Showcase') {
          iconName = 'storefront-outline';
        }

         if (route.name === 'Settings') {
          iconName = 'cog-outline';
        }

        if (route.name === 'OrderAdd') {
          iconName = 'plus-circle-outline';
        }

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'transparent',
            }}
          >
            <IconButton
              icon={iconName}
              iconColor={isFocused ? theme.colors.primary : 'black'}
              size={26}
            />
            <Text style={{ color: isFocused ? theme.colors.primary : 'black' }}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName={"Home"}
      tabBar={props => <MyTabBar {...props} />}
      sceneContainerStyle={{ backgroundColor: theme.colors.gray }}
      screenOptions={({ route }) => ({

      })}


    >
      <Tab.Screen name="OrderAdd" options={{ headerTitle: 'Создать заказ', title: 'Создать'}}
                  component={AddOrder}
      />
      <Tab.Screen name="Sale" options={{ headerTitle: 'Продажи', title: 'Продажи'}}
                  component={HomeScreen}
      />
      <Tab.Screen name="Showcase" options={{ headerTitle: 'Витрина', title: 'Витрина'}}
                  component={ShowCaseScreen}
      />
      <Tab.Screen name="Settings"
                  component={SettingsScreen} options={{ headerTitle: 'Настройки', title: 'Настройки'}}
        />
    </Tab.Navigator>
  );
};

export default function App() {
  return (

      <TabNavigator />
  );
}
