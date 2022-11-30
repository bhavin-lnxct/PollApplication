import {View, Text} from 'react-native';
import React from 'react';
import {Paragraph, Dialog, Portal} from 'react-native-paper';
import colors from '../../theme/colors/colors';

interface ModalDialogInterface {
  setVisible: (b: boolean) => void;
  visible: boolean;
  children: React.ReactNode;
}

const ModalDialog = ({setVisible, visible, children}: ModalDialogInterface) => {
  return (
    <View>
      <Portal>
        <Dialog
          onDismiss={() => {
            setVisible(!visible);
          }}
          style={{
            backgroundColor: colors.AppTheme.Secondary,
          }}
          visible={visible}>
          <Dialog.Content>{children}</Dialog.Content>
        </Dialog>
      </Portal>
    </View>
  );
};

export default ModalDialog;
