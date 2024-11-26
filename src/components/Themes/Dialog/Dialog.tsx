import React from 'react';
import { Dialog, Portal, Text } from 'react-native-paper';
import styles from './Styles';

// Определение типов для пропсов, если вы используете TypeScript
type CustomDialogProps = {
  title: string;
  content: string;
  isVisible: boolean;
  dismissable?: boolean;
  onDismiss: () => void;
  onConfirm: () => void;
  dialogActions?: any
  contentJsx?: any
};

// Компонент CustomDialog
const CustomDialog: React.FC<CustomDialogProps> = ({
                                                     title,
                                                     content,

                                                     isVisible,
                                                     onDismiss = undefined,
                                                     onConfirm = null,
                                                     dialogActions = false,
                                                     contentJsx = undefined,
                                                     dismissable = true
                                                   }) => {

  return (
    <Portal>
    <Dialog
      style={styles.dialogStyle}
      visible={isVisible}
      dismissable={dismissable}
      onDismiss={onDismiss}
    >
      <Dialog.Title style={styles.dialogTitle}>{title}</Dialog.Title>
      <Dialog.Content>
        <Text style={styles.dialogContent}>{content}</Text>
        {contentJsx}
      </Dialog.Content>
      <Dialog.Actions style={styles.dialogActions}>
        {dialogActions}
      </Dialog.Actions>
    </Dialog>
</Portal>
  );
};

export default CustomDialog;
