import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { useAuthStore } from '../stores/AuthState';
import CustomButton from "../components/Forms/CustomButton.tsx";
import { loginUser } from "../application/useCases/user/loginUser.ts";
import AjaxLoader from "../components/Themes/AjaxLoader.tsx";
//import api from '../services/api';

const LoginScreen = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [showAjaxPreloader, setShowAjaxPreloader] =  useState(false);

  const storeLogin = useAuthStore((state) => state.login);

  const handleLogin = async () => {
    try {
      setShowAjaxPreloader(true);
      const result = await loginUser(login, password);
      if(result.success) {
        storeLogin(result?.data?.token ?? '');
      }

    } catch (error) {

    } finally {
      setShowAjaxPreloader(false);
    }
  };

  return (
    <View style={styles.container}>
      <AjaxLoader show={showAjaxPreloader} />
      <Text style={styles.title}>Авторизация</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={login}
        onChangeText={setLogin}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Пароль"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <CustomButton  mode="contained" onPress={handleLogin} style={styles.button}>
        Войти
      </CustomButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  button: {
    marginTop: 16,
  },
});

export default LoginScreen;
