import React from 'react';
import { Appbar } from "react-native-paper";

import { getHeaderTitle } from '@react-navigation/elements';
import { View } from "react-native";
import { theme } from "../../../styles/theme";

export const DraftHeader = ({ route, options, navigation, previous, back, showBell = true, showSettings = true }) => {

  const title = getHeaderTitle(options, route.name);


  return (
    <Appbar.Header style={{ backgroundColor: theme.contentContainer.backgroundColor, elevation: 0 }}>
      {/* Иконка слева */}
      <View style={{ position: "absolute" }}>
        { options.extraHeaderLeft && options.extraHeaderLeft() }
      </View>
      {/* Заголовок по центру */}
      <Appbar.Content title={title} titleStyle={{...theme.title,  textAlign: 'center' }}  style={{
        flex: 1, // Make the content container take up all available space
        justifyContent: 'center', // Center the content vertically
        alignItems: 'center', // Center the content horizontally (optional)
        alignSelf: 'center'
      }} />
      {/* Иконка справа */}
      <View style={{ position: "absolute", right: 0 }}>
       { options.extraHeaderRight &&   options.extraHeaderRight()}
      </View>
    </Appbar.Header>
  );
};
