import { DefaultTheme, configureFonts, MD2LightTheme } from "react-native-paper";
const _fontConfig = {
  regular: {
    fontFamily: 'Roboto',
    fontWeight: 'normal',
  },
  medium: {
    fontFamily: 'Roboto-Medium',
    fontWeight: 'normal',
  },
  light: {
    fontFamily: 'Roboto-Light',
    fontWeight: 'normal',
  },
  thin: {
    fontFamily: 'Roboto-Thin',
    fontWeight: 'normal',
  },
};
const fontConfig = {
  ios: _fontConfig,
  android: _fontConfig,
};

export const theme = {
  ...MD2LightTheme,
  fonts: configureFonts({config: fontConfig, isV3: false}),
  screen: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    flex: 1,
    //backgroundColor: 'red',
   // justifyContent: 'center',
  },
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#7367f0',
    accent: '#f1c40f',
    text: '#1E1F20',
    gray: '#F1F1F1',
    blue: '#326BD0',
    placeholder: '#32325420', // цвет placeholder текста
  },
  bottomIconColor: '#EF8A34',
  contentContainer: {
    flex: 1,
   // position: "relative",
    backgroundColor: '#f2f2f2',
    padding: 15, // Отступы со всех сторон
    // Дополнительные стили для контентной области если нужно
  },
  title: {
    // @ts-ignore
    ...DefaultTheme.title || {},
    fontWeight: '700',
    color: '#1E1F20',
    fontSize: 20,
    lineHeight: 24,
    letterSpacing: 0.50,
  },
  inputText: {
    height: 100,
    borderColor: 'red',
  },
  buttonDisabled: {
    // Стили для отключенного состояния
    opacity: 0.2, // Пример уменьшения прозрачности
    backgroundColor: '#323254', // Пример изменения фона
    color: 'white',
    // Другие стили...
  },
  buttonActive: {
    backgroundColor: '#EF8A34',
    color: 'white',
  },
  input: {
    borderRadius: 8,
  },
  button: {
    borderRadius: 8, // скругление углов
    paddingVertical: 2, // вертикальный паддинг
    paddingHorizontal: 3, // горизонтальный паддинг
    elevation: 4, // добавляет тень для Android
    // для iOS добавьте тени также:
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
  },
  header: {
    color: '#1E1F20'
  },
};
