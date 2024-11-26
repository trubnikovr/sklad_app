import React from 'react';
import { View } from "react-native";
import { Appbar, useTheme } from "react-native-paper";

import { getHeaderTitle } from '@react-navigation/elements';
import { theme } from "../../../styles/theme";

export const InnerHeader = ({ route,
                              options,
                              navigation,
                              previous,
                              back,
                              customBack = () => {}
}) => {

  const title = getHeaderTitle(options, route.name);
  const { previousScreen = null } = route?.params || {};

  const goBackToPreviousScreen = () => {
    if (previousScreen) {
      navigation.navigate(previousScreen);
    } else {
      navigation.goBack();
    }
  };

  return (
    <Appbar.Header style={{ backgroundColor: theme.contentContainer.backgroundColor, elevation: 0 }}>
      <View style={{ position: "absolute" }}>
        {back && <Appbar.BackAction onPress={goBackToPreviousScreen} />}
        {/*{customBack && <Appbar.BackAction onPress={() => customBack && customBack()} />}*/}
      </View>
      <Appbar.Content title={title} titleStyle={{...theme.title,}}  style={{
        flex: 1, // Make the content container take up all available space
        justifyContent: 'center', // Center the content vertically
        alignItems: 'center', // Center the content horizontally (optional)
      }} />


        { options.extraHeaderRight &&
          (<View style={{ position: "absolute", right: 0 }}>
              {options.extraHeaderRight()}
          </View>
          )}


    </Appbar.Header>
  );
};
