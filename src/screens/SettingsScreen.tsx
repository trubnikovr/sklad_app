import React, { useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableWithoutFeedback } from 'react-native';
import { Card, IconButton } from 'react-native-paper';
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import AjaxLoader from "../components/Themes/AjaxLoader.tsx";
import { theme } from "../styles/theme.ts";
import { uploadProductsFromServer } from "../application/useCases/uploadProductsFromServer.ts";


const SettingsScreen = () => {
  const [ajaxLoader, setAjaxLoader] = useState(false);
  const items = [
    { id: 1, label: 'Обновить витрину', icon: 'upload', color: '#4A90E2', action: () => handlerUploadProductsFromServer() },
    { id: 2, label: 'Закрыть смену', icon: 'lipstick', color: '#4CAF50', action: () => console.log('Закрыть смену') },
    { id: 3, label: 'Настройки', icon: 'sunglasses', color: '#FF4081', action: () => console.log('Настройки') },
    { id: 4, label: 'Выйти', icon: 'tshirt-crew', color: '#3F51B5', action: () => console.log('Выйти') },
  ];

  const handlerUploadProductsFromServer = async () => {
    try {
      setAjaxLoader(true);
      await uploadProductsFromServer();
    } catch (e) {
      console.error(e && e.toString());
    } finally {
      setAjaxLoader(false);
    }
  }

  return (
    <View style={theme.screen}>
      <AjaxLoader show={ajaxLoader} />

        <View style={styles1.gridContainer}>
        {items.map((item) => (
          <TouchableWithoutFeedback onPress={item.action} key={item.id}>
            <Card
              key={item.id}
              style={[styles1.card, { backgroundColor: item.color }]}
              onPress={item.action} // Attach the action to onPress
            >
              <View >
                <Text style={styles1.cardText}>{item.label}</Text>
              </View>
            </Card>
          </TouchableWithoutFeedback>
        ))}
        </View>

    </View>
  );
};



const styles1 = StyleSheet.create({
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  //  backgroundColor: 'red',
    padding: scale(10),
  },
  card: {
    width: scale(100),
    height: verticalScale(100),
    margin: scale(10),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(8),
  },
  cardText: {
    color: 'white',
    fontSize: moderateScale(12),
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: verticalScale(8),
  },
});

export default SettingsScreen;
