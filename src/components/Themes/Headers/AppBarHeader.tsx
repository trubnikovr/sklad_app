import React from 'react';
import { Appbar } from "react-native-paper";
import { getHeaderTitle } from '@react-navigation/elements';
import { ROUTES } from "../../../configs/routes";
import { theme } from "../../../styles/theme";
import { View } from "react-native";


export const AppBarHeader = ({ route, options, navigation, previous, back, showBell = true, showSettings = true }) => {

  const title = getHeaderTitle(options, route.name);
  const openSettings = () => {

    navigation.navigate(ROUTES.SETTINGS, {
      previousScreen: route.name
    }); // 'Settings' должен быть ключом экрана настроек в вашем стеке навигации
  };

  return (
    <Appbar.Header style={{ backgroundColor: theme.contentContainer.backgroundColor, elevation: 0 }}>
      {/* Иконка слева */}
       {/* Заголовок по центру */}
      <Appbar.Content title={title} titleStyle={{...theme.title,  textAlign: 'center' }}  style={{
        flex: 1, // Make the content container take up all available space
        justifyContent: 'center', // Center the content vertically
        alignItems: 'center', // Center the content horizontally (optional)
        alignSelf: 'center',
        right: 4
      }} />
      {/* Иконка справа */}
      {showSettings && (options.extraHeaderRight ?  options.extraHeaderRight() : (
        <View style={{ position: "absolute", right: 4 }}>
        <Appbar.Action icon="cog-outline" iconColor={theme.header.color} onPress={openSettings} />
        </View>
      ))}
    </Appbar.Header>
  );
};
