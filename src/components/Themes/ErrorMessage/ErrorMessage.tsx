// components/ErrorMessage.tsx
import React from 'react';
import { Snackbar } from 'react-native-paper';
import { useExceptionStore } from "../../../stores/useExceptionStore";


const ErrorMessage = () => {

  const { error, hideError } = useExceptionStore();

  return (
    <Snackbar
      style={{ zIndex: 1000, }}
      visible={error !== null}
      onDismiss={hideError}
      duration={5000} // Продолжительность отображения сообщения
    >
      {error}
    </Snackbar>
  );
};

export default ErrorMessage;
