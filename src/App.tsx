import * as React from 'react';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import { SafeAreaView, View, Text, StyleSheet, StatusBar, useColorScheme } from 'react-native';
import Layout from "./components/Themes/Layout/Layout.tsx";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { theme } from "./styles/theme.ts";
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from "./navigators/AppNavigator.tsx";
import { database } from "./model/init.ts";
import { useAuthStore } from "./stores/AuthState.ts";
import { useEffect, useState } from "react";
import AjaxLoader from "./components/Themes/AjaxLoader.tsx";

const App = () => {

  const isDarkMode = useColorScheme() === 'dark';
  const [showAjaxPreloader, setShowAjaxPreloader] = useState(true)

  const checkAuthStatus = useAuthStore((state) => state.checkAuthStatus);

  useEffect(() => {
    try {
      checkAuthStatus(); // Check authentication status when the app starts
    } catch (e) {
      console.error('App - useEffect ', e);
    } finally {
      setShowAjaxPreloader(false)
    }
  }, [checkAuthStatus]);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.dark : Colors.light,
  };

  function content()
  {
    return <AppNavigator />
  }

  return (
    <PaperProvider theme={theme}>
      <AjaxLoader show={showAjaxPreloader} />
      <Layout >
        <NavigationContainer>
          <StatusBar
            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            backgroundColor={backgroundStyle.backgroundColor}
          />
          {content()}
        </NavigationContainer>
      </Layout>
    </PaperProvider>
  );
};
export default App;
