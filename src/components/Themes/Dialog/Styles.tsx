import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  dialogStyle: {
    borderRadius: 15, // скругление углов
    backgroundColor: 'white', // цвет фона
    // Вы можете добавить тень с помощью следующих стилей:
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  dialogTitle: {
    fontSize: 18, // размер шрифта заголовка
    color: 'black', // цвет текста заголовка
  },
  dialogContent: {
    fontSize: 16, // размер шрифта содержимого
    color: 'black', // цвет текста содержимого
  },
  dialogActions: {
    justifyContent: 'center', // центрирование кнопок
    marginHorizontal: 10, // горизонтальный отступ от краев диалога
  },
});

export default styles
