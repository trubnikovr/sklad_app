import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { withTheme } from 'react-native-paper';
import ErrorMessage from './../ErrorMessage/ErrorMessage';

// @ts-ignore
const Layout = ({ children, theme }) => {
  // Доступ к цветам из текущей темы
  const { colors } = theme;

  // Кастомизированные стили, использующие цвета из темы
  const styles = {
    safeArea: {
      flex: 1,
    //  backgroundColor: colors.surface, // Использование цвета поверхности из темы
    },
    contentContainer: {
      flex: 1,
      padding: 16, // Отступы со всех сторон
      // Дополнительные стили для контентной области если нужно
    },
    // Добавьте другие стили, если нужно
  };

  return (
    <View style={styles.safeArea}>
        {children}
        <ErrorMessage />
    </View>
  );
};

// Оборачиваем компонент в withTheme для доступа к текущей теме
export default withTheme(Layout);
